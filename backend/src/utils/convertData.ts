/**
 * データを変換する
 * @param data 変換前のデータ
 * @returns 変換後のデータ
 */

import { IMeta } from '../const';

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
export const convertDamAiSummary = (data: any) =>
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
        scoreDetail.intervalGraphPointsSection01,
        scoreDetail.intervalGraphPointsSection02,
        scoreDetail.intervalGraphPointsSection03,
        scoreDetail.intervalGraphPointsSection04,
        scoreDetail.intervalGraphPointsSection05,
        scoreDetail.intervalGraphPointsSection06,
        scoreDetail.intervalGraphPointsSection07,
        scoreDetail.intervalGraphPointsSection08,
        scoreDetail.intervalGraphPointsSection09,
        scoreDetail.intervalGraphPointsSection10,
        scoreDetail.intervalGraphPointsSection11,
        scoreDetail.intervalGraphPointsSection12,
        scoreDetail.intervalGraphPointsSection13,
        scoreDetail.intervalGraphPointsSection14,
        scoreDetail.intervalGraphPointsSection15,
        scoreDetail.intervalGraphPointsSection16,
        scoreDetail.intervalGraphPointsSection17,
        scoreDetail.intervalGraphPointsSection18,
        scoreDetail.intervalGraphPointsSection19,
        scoreDetail.intervalGraphPointsSection20,
        scoreDetail.intervalGraphPointsSection21,
        scoreDetail.intervalGraphPointsSection22,
        scoreDetail.intervalGraphPointsSection23,
        scoreDetail.intervalGraphPointsSection24,
      ],
    };

    // AI known fields
    const aiFields = {
      scoringAiId: scoreDetail.scoringAiId,
      accentCount: scoreDetail.accentCount,
      aiSensitivityBonus: scoreDetail.aiSensitivityBonus,
      aiSensitivityMeterAdd: scoreDetail.aiSensitivityMeterAdd,
      aiSensitivityMeterDeduct: scoreDetail.aiSensitivityMeterDeduct,
      aiSensitivityPoints: scoreDetail.aiSensitivityPoints,
      edgeVoiceCount: scoreDetail.edgeVoiceCount,
      fadeout: scoreDetail.fadeout,
      maxTotalPoints: scoreDetail.maxTotalPoints,
      spare1: scoreDetail.spare1,
      spare2: scoreDetail.spare2,
      aiSensitivityGraphAddPoints: [
        scoreDetail.aiSensitivityGraphAddPointsSection01,
        scoreDetail.aiSensitivityGraphAddPointsSection02,
        scoreDetail.aiSensitivityGraphAddPointsSection03,
        scoreDetail.aiSensitivityGraphAddPointsSection04,
        scoreDetail.aiSensitivityGraphAddPointsSection05,
        scoreDetail.aiSensitivityGraphAddPointsSection06,
        scoreDetail.aiSensitivityGraphAddPointsSection07,
        scoreDetail.aiSensitivityGraphAddPointsSection08,
        scoreDetail.aiSensitivityGraphAddPointsSection09,
        scoreDetail.aiSensitivityGraphAddPointsSection10,
        scoreDetail.aiSensitivityGraphAddPointsSection11,
        scoreDetail.aiSensitivityGraphAddPointsSection12,
        scoreDetail.aiSensitivityGraphAddPointsSection13,
        scoreDetail.aiSensitivityGraphAddPointsSection14,
        scoreDetail.aiSensitivityGraphAddPointsSection15,
        scoreDetail.aiSensitivityGraphAddPointsSection16,
        scoreDetail.aiSensitivityGraphAddPointsSection17,
        scoreDetail.aiSensitivityGraphAddPointsSection18,
        scoreDetail.aiSensitivityGraphAddPointsSection19,
        scoreDetail.aiSensitivityGraphAddPointsSection20,
        scoreDetail.aiSensitivityGraphAddPointsSection21,
        scoreDetail.aiSensitivityGraphAddPointsSection22,
        scoreDetail.aiSensitivityGraphAddPointsSection23,
        scoreDetail.aiSensitivityGraphAddPointsSection24,
      ],
      aiSensitivityGraphDeductPoints: [
        scoreDetail.aiSensitivityGraphDeductPointsSection01,
        scoreDetail.aiSensitivityGraphDeductPointsSection02,
        scoreDetail.aiSensitivityGraphDeductPointsSection03,
        scoreDetail.aiSensitivityGraphDeductPointsSection04,
        scoreDetail.aiSensitivityGraphDeductPointsSection05,
        scoreDetail.aiSensitivityGraphDeductPointsSection06,
        scoreDetail.aiSensitivityGraphDeductPointsSection07,
        scoreDetail.aiSensitivityGraphDeductPointsSection08,
        scoreDetail.aiSensitivityGraphDeductPointsSection09,
        scoreDetail.aiSensitivityGraphDeductPointsSection10,
        scoreDetail.aiSensitivityGraphDeductPointsSection11,
        scoreDetail.aiSensitivityGraphDeductPointsSection12,
        scoreDetail.aiSensitivityGraphDeductPointsSection13,
        scoreDetail.aiSensitivityGraphDeductPointsSection14,
        scoreDetail.aiSensitivityGraphDeductPointsSection15,
        scoreDetail.aiSensitivityGraphDeductPointsSection16,
        scoreDetail.aiSensitivityGraphDeductPointsSection17,
        scoreDetail.aiSensitivityGraphDeductPointsSection18,
        scoreDetail.aiSensitivityGraphDeductPointsSection19,
        scoreDetail.aiSensitivityGraphDeductPointsSection20,
        scoreDetail.aiSensitivityGraphDeductPointsSection21,
        scoreDetail.aiSensitivityGraphDeductPointsSection22,
        scoreDetail.aiSensitivityGraphDeductPointsSection23,
        scoreDetail.aiSensitivityGraphDeductPointsSection24,
      ],
      aiSensitivityGraphIndex: [
        scoreDetail.aiSensitivityGraphIndexSection01,
        scoreDetail.aiSensitivityGraphIndexSection02,
        scoreDetail.aiSensitivityGraphIndexSection03,
        scoreDetail.aiSensitivityGraphIndexSection04,
        scoreDetail.aiSensitivityGraphIndexSection05,
        scoreDetail.aiSensitivityGraphIndexSection06,
        scoreDetail.aiSensitivityGraphIndexSection07,
        scoreDetail.aiSensitivityGraphIndexSection08,
        scoreDetail.aiSensitivityGraphIndexSection09,
        scoreDetail.aiSensitivityGraphIndexSection10,
        scoreDetail.aiSensitivityGraphIndexSection11,
        scoreDetail.aiSensitivityGraphIndexSection12,
        scoreDetail.aiSensitivityGraphIndexSection13,
        scoreDetail.aiSensitivityGraphIndexSection14,
        scoreDetail.aiSensitivityGraphIndexSection15,
        scoreDetail.aiSensitivityGraphIndexSection16,
        scoreDetail.aiSensitivityGraphIndexSection17,
        scoreDetail.aiSensitivityGraphIndexSection18,
        scoreDetail.aiSensitivityGraphIndexSection19,
        scoreDetail.aiSensitivityGraphIndexSection20,
        scoreDetail.aiSensitivityGraphIndexSection21,
        scoreDetail.aiSensitivityGraphIndexSection22,
        scoreDetail.aiSensitivityGraphIndexSection23,
        scoreDetail.aiSensitivityGraphIndexSection24,
      ],
    };

    // DXG known fields
    const dxgFields = {
      scoringDxgId: scoreDetail.scoringDxgId,
      lastTotalPoints: scoreDetail.lastTotalPoints,
      bonusType: scoreDetail.bonusType,
      bonusPoint: scoreDetail.bonusPoint,
      expressionGraphPointsSection: [
        scoreDetail.expressionGraphPointsSection01,
        scoreDetail.expressionGraphPointsSection02,
        scoreDetail.expressionGraphPointsSection03,
        scoreDetail.expressionGraphPointsSection04,
        scoreDetail.expressionGraphPointsSection05,
        scoreDetail.expressionGraphPointsSection06,
        scoreDetail.expressionGraphPointsSection07,
        scoreDetail.expressionGraphPointsSection08,
        scoreDetail.expressionGraphPointsSection09,
        scoreDetail.expressionGraphPointsSection10,
        scoreDetail.expressionGraphPointsSection11,
        scoreDetail.expressionGraphPointsSection12,
        scoreDetail.expressionGraphPointsSection13,
        scoreDetail.expressionGraphPointsSection14,
        scoreDetail.expressionGraphPointsSection15,
        scoreDetail.expressionGraphPointsSection16,
        scoreDetail.expressionGraphPointsSection17,
        scoreDetail.expressionGraphPointsSection18,
        scoreDetail.expressionGraphPointsSection19,
        scoreDetail.expressionGraphPointsSection20,
        scoreDetail.expressionGraphPointsSection21,
        scoreDetail.expressionGraphPointsSection22,
        scoreDetail.expressionGraphPointsSection23,
        scoreDetail.expressionGraphPointsSection24,
      ],
      expressionGraphIndexSection: [
        scoreDetail.expressionGraphIndexSection01,
        scoreDetail.expressionGraphIndexSection02,
        scoreDetail.expressionGraphIndexSection03,
        scoreDetail.expressionGraphIndexSection04,
        scoreDetail.expressionGraphIndexSection05,
        scoreDetail.expressionGraphIndexSection06,
        scoreDetail.expressionGraphIndexSection07,
        scoreDetail.expressionGraphIndexSection08,
        scoreDetail.expressionGraphIndexSection09,
        scoreDetail.expressionGraphIndexSection10,
        scoreDetail.expressionGraphIndexSection11,
        scoreDetail.expressionGraphIndexSection12,
        scoreDetail.expressionGraphIndexSection13,
        scoreDetail.expressionGraphIndexSection14,
        scoreDetail.expressionGraphIndexSection15,
        scoreDetail.expressionGraphIndexSection16,
        scoreDetail.expressionGraphIndexSection17,
        scoreDetail.expressionGraphIndexSection18,
        scoreDetail.expressionGraphIndexSection19,
        scoreDetail.expressionGraphIndexSection20,
        scoreDetail.expressionGraphIndexSection21,
        scoreDetail.expressionGraphIndexSection22,
        scoreDetail.expressionGraphIndexSection23,
        scoreDetail.expressionGraphIndexSection24,
      ],
    };

    // Extract keys
    const allKeys = Object.keys(scoreDetail);

    // Known keys
    const knownKeys = Object.keys(knownFields)
      .concat(Object.keys(aiFields))
      .concat(Object.keys(dxgFields))
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
      result.ai = aiFields;
    }

    if (scoreDetail.scoringDxgId) {
      result.dxg = dxgFields;
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
