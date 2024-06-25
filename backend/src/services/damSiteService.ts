import axios from 'axios';
import { convertXmlToJson } from '../utils/convertXmlToJson';
import { convertDamAiSummary, convertMeta } from '../utils/convertData';
import { IMeta } from '../const';

const cdmCardNo = process.env.CDM_CARD_NO;

const url = 'https://www.clubdam.com/app/damtomo/scoring/GetScoringAiListXML.do';

export const fetchDamSite = async (
  pageNo: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<{ list: any[]; meta: IMeta }> => {
  try {
    const response = await axios.get(url, {
      params: {
        cdmCardNo,
        pageNo,
        detailFlg: 1,
      },
    });

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

  const currentMaxDamScoringAiId = 1;

  let hasNext = true;

  while (hasNext) {
    // eslint-disable-next-line no-await-in-loop
    const { list } = await fetchDamSite(pageNo);

    resultList.push(...list);

    if (
      (currentMaxDamScoringAiId &&
        list.map((data) => data.scoringAiId).includes(currentMaxDamScoringAiId)) ||
      pageNo === maxPageNo
    ) {
      hasNext = false;
    }

    pageNo += 1;
  }

  return resultList;
};
