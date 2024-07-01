import axios from 'axios';
import { convertXmlToJson } from '../utils/convertXmlToJson';
import { IMeta } from '../const';
import { convertDamScores, convertMeta } from '../utils/convertDamScores';

const cdmCardNo = process.env.CDM_CARD_NO;

const damAiUrl = 'https://www.clubdam.com/app/damtomo/scoring/GetScoringAiListXML.do';
const damDxgUrl = 'https://www.clubdam.com/app/damtomo/scoring/GetScoringDxgListXML.do';

export const fetchDamSite = async (
  options: { pageNo?: number; id?: number; type: 'scoringAi' | 'scoringDxg' }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<{ list: any[]; meta: IMeta }> => {
  const key = options.type === 'scoringAi' ? 'scoringAiId' : 'scoringDxgId';
  const params = {
    cdmCardNo,
    pageNo: options.pageNo ?? undefined,
    [key]: options.id ?? undefined,
    detailFlg: 1,
    dxgType: options.type === 'scoringDxg' ? 1 : undefined,
  };

  try {
    const response = await axios.get(options.type === 'scoringAi' ? damAiUrl : damDxgUrl, {
      params,
    });

    const data = response.data;
    const resultJson = await convertXmlToJson(data);
    const list = convertDamScores(resultJson);

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
  ids?: number[];
  type: 'scoringAi' | 'scoringDxg';
}) => {
  const resultList = [];
  let pageNo = options.minPage || 1;
  const maxPageNo = options.maxPage || 40;
  let remainingIds: number[] = options.ids || [];
  const key = options.type === 'scoringAi' ? 'scoringAiId' : 'scoringDxgId';

  const currentMaxId = undefined;

  // まずはページ数を指定して取得
  // eslint-disable-next-line no-constant-condition
  while (true) {
    console.log(`pageNo: ${pageNo}のデータを取得します`); // eslint-disable-line no-console
    // eslint-disable-next-line no-await-in-loop
    const { list } = await fetchDamSite({ pageNo, type: options.type });

    if (list.length === 0) break;

    resultList.push(...list);

    if (pageNo >= maxPageNo) break;

    const ids = list.map((data) => Number(data[key]));
    remainingIds = remainingIds.filter((id) => ids.includes(id));

    if (currentMaxId && ids.includes(currentMaxId)) break;

    pageNo += 1;
  }

  // 残りのAiデータを取得
  await Promise.all(
    remainingIds.map(async (id) => {
      console.log(`id: ${id}のデータを取得します`); // eslint-disable-line no-console
      const { list } = await fetchDamSite({ id, type: options.type });
      resultList.push(...list);
    })
  );

  return resultList;
};
