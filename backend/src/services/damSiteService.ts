import axios from 'axios';
import { convertXmlToJson } from '../utils/convertXmlToJson';
import { convertDamAiSummary, convertMeta } from '../utils/convertData';
import { IMeta } from '../const';

const cdmCardNo = process.env.CDM_CARD_NO;

const url = 'https://www.clubdam.com/app/damtomo/scoring/GetScoringAiListXML.do';

export const fetchDamSite = async (
  options: { pageNo?: number; scoringAiId?: number }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<{ list: any[]; meta: IMeta }> => {
  const params = {
    cdmCardNo,
    pageNo: options.pageNo ?? undefined,
    scoringAiId: options.scoringAiId ?? undefined,
    detailFlg: 1,
  };

  try {
    const response = await axios.get(url, { params });

    const data = response.data;
    const resultJson = await convertXmlToJson(data);
    const list = convertDamAiSummary(resultJson);

    const meta = convertMeta(resultJson);
    return { list, meta };
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
    return { list: [], meta: { currentPage: 0, total: 0, lastPage: 0 } };
  }
};

export const fetchDamSiteList = async (options: {
  minPage?: number;
  maxPage?: number;
  scoringAiIds?: number[];
}) => {
  const resultList = [];
  let pageNo = options.minPage || 1;
  const maxPageNo = options.maxPage || 40;
  let remainingScoringAiIds: number[] = options.scoringAiIds || [];

  const currentMaxDamScoringAiId = undefined;

  // まずはページ数を指定して取得
  // eslint-disable-next-line no-constant-condition
  while (true) {
    // eslint-disable-next-line no-await-in-loop
    const { list } = await fetchDamSite({ pageNo });

    if (list.length === 0) break;

    resultList.push(...list);

    if (pageNo >= maxPageNo) break;

    const scoringAiIds = list.map((data) => data.scoringAiId);
    remainingScoringAiIds = remainingScoringAiIds.filter((id) => scoringAiIds.includes(id));

    if (currentMaxDamScoringAiId && scoringAiIds.includes(currentMaxDamScoringAiId)) break;

    pageNo += 1;
  }

  // 残りのAiデータを取得
  await Promise.all(
    remainingScoringAiIds.map(async (scoringAiId) => {
      const { list } = await fetchDamSite({ scoringAiId });
      resultList.push(...list);
    })
  );

  return resultList;
};
