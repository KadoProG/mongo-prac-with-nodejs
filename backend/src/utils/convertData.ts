/**
 * データを変換する
 * @param data 変換前のデータ
 * @returns 変換後のデータ
 */

import { IMeta } from '../const';
import { convertDataDamAiFields } from './convertDataDamAiFields';
import { convertDataDamDxgFields } from './convertDataDamDxgFields';

/**
 * ### DAMデータを変換する関数です
 *
 * - 精密採点Ai
 * - 精密採点DX-G
 *
 * に対応しています。部分的にオブジェクトや配列に変換しています。
 * @param data 変換前のデータ
 * @returns 変換後のデータ
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const convertDamScores = (data: any) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data.document.list[0].data.map((d: any) => {
    const scoring = d.scoring[0];
    const scoreDetail = scoring.$;

    // Common known fields
    const knownFields: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [key: string]: any;
    } = {
      contentsName: scoreDetail.contentsName,
      dContentsName: scoreDetail.dContentsName,
      artistName: scoreDetail.artistName,
      dArtistName: scoreDetail.dArtistName,
      damserial: scoreDetail.damserial,
      dataKind: scoreDetail.dataKind,
      dataSize: scoreDetail.dataSize,
      entryCount: scoreDetail.entryCount,
      fallCount: scoreDetail.fallCount,
      edyId: scoreDetail.edyId,
      favorite: scoreDetail.favorite,
      hammeringOnCount: scoreDetail.hammeringOnCount,
      hiccupCount: scoreDetail.hiccupCount,
      intonation: scoreDetail.intonation,
      kobushiCount: scoreDetail.kobushiCount,
      lastPerformKey: scoreDetail.lastPerformKey,
      longtoneSkill: scoreDetail.longtoneSkill,
      nationalAverageExpression: scoreDetail.nationalAverageExpression,
      nationalAveragePitch: scoreDetail.nationalAveragePitch,
      nationalAverageRhythm: scoreDetail.nationalAverageRhythm,
      nationalAverageStability: scoreDetail.nationalAverageStability,
      nationalAverageTotalPoints: scoreDetail.nationalAverageTotalPoints,
      nationalAverageVibratoAndLongtone: scoreDetail.nationalAverageVibratoAndLongtone,
      radarChartExpressive: scoreDetail.radarChartExpressive,
      radarChartPitch: scoreDetail.radarChartPitch,
      radarChartRhythm: scoreDetail.radarChartRhythm,
      radarChartStability: scoreDetail.radarChartStability,
      radarChartVibratoLongtone: scoreDetail.radarChartVibratoLongtone,
      requestNo: scoreDetail.requestNo,
      requestNoChapter: scoreDetail.requestNoChapter,
      requestNoTray: scoreDetail.requestNoTray,
      scoringDateTime: scoreDetail.scoringDateTime,
      scoringEngineVersionNumber: scoreDetail.scoringEngineVersionNumber,
      shakuriCount: scoreDetail.shakuriCount,
      singingRangeHighest: scoreDetail.singingRangeHighest,
      singingRangeLowest: scoreDetail.singingRangeLowest,
      timing: scoreDetail.timing,
      topRecordNumber: scoreDetail.topRecordNumber,
      vibratoCount: scoreDetail.vibratoCount,
      vibratoType: scoreDetail.vibratoType,
      vibratoSkill: scoreDetail.vibratoSkill,
      vibratoTotalSecond: scoreDetail.vibratoTotalSecond,
      vocalRangeHighest: scoreDetail.vocalRangeHighest,
      vocalRangeLowest: scoreDetail.vocalRangeLowest,
      analysisReportCommentNo: scoreDetail.analysisReportCommentNo,
      clubDamCardNo: scoreDetail.clubDamCardNo,
      intervalGraphIndexSection: [
        scoreDetail.intervalGraphIndexSection01,
        scoreDetail.intervalGraphIndexSection02,
        scoreDetail.intervalGraphIndexSection03,
        scoreDetail.intervalGraphIndexSection04,
        scoreDetail.intervalGraphIndexSection05,
        scoreDetail.intervalGraphIndexSection06,
        scoreDetail.intervalGraphIndexSection07,
        scoreDetail.intervalGraphIndexSection08,
        scoreDetail.intervalGraphIndexSection09,
        scoreDetail.intervalGraphIndexSection10,
        scoreDetail.intervalGraphIndexSection11,
        scoreDetail.intervalGraphIndexSection12,
        scoreDetail.intervalGraphIndexSection13,
        scoreDetail.intervalGraphIndexSection14,
        scoreDetail.intervalGraphIndexSection15,
        scoreDetail.intervalGraphIndexSection16,
        scoreDetail.intervalGraphIndexSection17,
        scoreDetail.intervalGraphIndexSection18,
        scoreDetail.intervalGraphIndexSection19,
        scoreDetail.intervalGraphIndexSection20,
        scoreDetail.intervalGraphIndexSection21,
        scoreDetail.intervalGraphIndexSection22,
        scoreDetail.intervalGraphIndexSection23,
        scoreDetail.intervalGraphIndexSection24,
      ],
      intervalGraphPointsSection: [
        Number(scoreDetail.intervalGraphPointsSection01),
        Number(scoreDetail.intervalGraphPointsSection02),
        Number(scoreDetail.intervalGraphPointsSection03),
        Number(scoreDetail.intervalGraphPointsSection04),
        Number(scoreDetail.intervalGraphPointsSection05),
        Number(scoreDetail.intervalGraphPointsSection06),
        Number(scoreDetail.intervalGraphPointsSection07),
        Number(scoreDetail.intervalGraphPointsSection08),
        Number(scoreDetail.intervalGraphPointsSection09),
        Number(scoreDetail.intervalGraphPointsSection10),
        Number(scoreDetail.intervalGraphPointsSection11),
        Number(scoreDetail.intervalGraphPointsSection12),
        Number(scoreDetail.intervalGraphPointsSection13),
        Number(scoreDetail.intervalGraphPointsSection14),
        Number(scoreDetail.intervalGraphPointsSection15),
        Number(scoreDetail.intervalGraphPointsSection16),
        Number(scoreDetail.intervalGraphPointsSection17),
        Number(scoreDetail.intervalGraphPointsSection18),
        Number(scoreDetail.intervalGraphPointsSection19),
        Number(scoreDetail.intervalGraphPointsSection20),
        Number(scoreDetail.intervalGraphPointsSection21),
        Number(scoreDetail.intervalGraphPointsSection22),
        Number(scoreDetail.intervalGraphPointsSection23),
        Number(scoreDetail.intervalGraphPointsSection24),
      ],
    };

    // Extract keys
    const allKeys = Object.keys(scoreDetail);

    // Known keys
    const knownKeys = Object.keys(knownFields)
      .concat(Object.keys(convertDataDamAiFields('')))
      .concat(Object.keys(convertDataDamDxgFields('')))
      .concat(
        // eslint-disable-next-line
        Array.from({ length: 24 }, (_, i) => [
          `intervalGraphIndexSection${String(i + 1).padStart(2, '0')}`,
          `intervalGraphPointsSection${String(i + 1).padStart(2, '0')}`,
          `aiSensitivityGraphAddPointsSection${String(i + 1).padStart(2, '0')}`,
          `aiSensitivityGraphDeductPointsSection${String(i + 1).padStart(2, '0')}`,
          `aiSensitivityGraphIndexSection${String(i + 1).padStart(2, '0')}`,
          `expressionGraphPointsSection${String(i + 1).padStart(2, '0')}`,
          `expressionGraphIndexSection${String(i + 1).padStart(2, '0')}`,
        ]).flat()
      );

    // Other keys
    const otherKeys = allKeys.filter((key) => !knownKeys.includes(key));

    // Other object
    const other = otherKeys.reduce(
      (acc, key) => {
        acc[key] = scoreDetail[key];
        return acc;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {} as Record<string, any>
    );

    // Result object
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = {
      score: scoring._,
      ...knownFields,
      other,
    };

    if (scoreDetail.scoringAiId) {
      result.ai = convertDataDamAiFields(scoreDetail);
      result.scoringAiId = scoreDetail.scoringAiId;
    }

    if (scoreDetail.scoringDxgId) {
      result.dxg = convertDataDamDxgFields(scoreDetail);
      result.scoringDxgId = scoreDetail.scoringDxgId;
    }

    return result;
  });

/**
 * メタデータを変換する
 * @param data 変換前のデータ
 * @returns 変換後のデータ
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const convertMeta = (data: any): IMeta => {
  const page = data.document.data[0].page[0];
  return {
    currentPage: Number(page._),
    total: Number(page.$.dataCount),
    lastPage: Number(page.$.pageCount),
  };
};
