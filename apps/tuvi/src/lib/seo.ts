import { getZodiacIndex, formatZodiac, getYearlyHoroscope } from "./calendar";

const zodiacToSlugMap: Record<string, string> = {
  "Tý": "ty",
  "Sửu": "suu",
  "Dần": "dan",
  "Mão": "mao",
  "Thìn": "thin",
  "Tỵ": "ty-chi",
  "Ngọ": "ngo",
  "Mùi": "mui",
  "Thân": "than",
  "Dậu": "dau",
  "Tuất": "tuat",
  "Hợi": "hoi",
};

const slugToZodiacMap: Record<string, string> = {
  ty: "Tý",
  suu: "Sửu",
  dan: "Dần",
  mao: "Mão",
  thin: "Thìn",
  "ty-chi": "Tỵ",
  ngo: "Ngọ",
  mui: "Mùi",
  than: "Thân",
  dau: "Dậu",
  tuat: "Tuất",
  hoi: "Hợi",
};

/**
 * Convert zodiac name to slug
 */
export function getZodiacSlug(zodiac: string): string {
  return zodiacToSlugMap[zodiac] || "ty";
}

/**
 * Convert slug to zodiac name
 */
export function getSlugZodiac(slug: string): string {
  return slugToZodiacMap[slug] || "Tý";
}

/**
 * Get all birth years for static generation
 */
export function getBirthYearRange(): number[] {
  return Array.from({ length: 71 }, (_, i) => 1940 + i);
}

/**
 * Get comprehensive article data for a birth year
 */
export function getYearArticle(year: number) {
  const zodiacIndex = getZodiacIndex(year);
  const zodiacName = formatZodiac(zodiacIndex);
  const horoscope = getYearlyHoroscope(zodiacIndex);
  const currentYear = new Date().getFullYear();

  const title = `Tử Vi Năm Sinh ${year} - Người Tuổi ${zodiacName} ${currentYear}`;
  const metaDescription = `Tử vi năm sinh ${year} tuổi ${zodiacName}. Xem tính cách, sự nghiệp, tình cảm và dự báo ${currentYear} cho người sinh năm ${year}. Chi tiết và chính xác.`;
  const keywords = `tử vi năm sinh ${year}, người tuổi ${zodiacName}, tử vi ${zodiacName} ${currentYear}, vận mệnh tuổi ${zodiacName}`;

  const h1 = `Tử Vi Năm Sinh ${year} - Người Tuổi ${zodiacName}`;

  const characterDescription = getCharacterDescription(zodiacIndex);
  const careerDescription = getCareerDescription(zodiacIndex);
  const loveDescription = getLoveDescription(zodiacIndex);
  const healthDescription = getHealthDescription(zodiacIndex);

  const sections = [
    {
      heading: "Tính Cách Người Tuổi " + zodiacName,
      content: characterDescription,
    },
    {
      heading: "Sự Nghiệp và Tài Chính",
      content: careerDescription,
    },
    {
      heading: "Tình Cảm và Hôn Nhân",
      content: loveDescription,
    },
    {
      heading: "Sức Khỏe",
      content: healthDescription,
    },
    {
      heading: `Dự Báo Vận Hạn Năm ${currentYear}`,
      content: horoscope.summary,
    },
  ];

  return {
    title,
    metaDescription,
    keywords,
    h1,
    sections,
    luckyData: {
      colors: horoscope.luckyColors,
      numbers: horoscope.luckyNumbers,
    },
    zodiac: zodiacName,
    zodiacIndex,
    year,
    currentYear,
    luckAreas: horoscope.luckAreas,
    challengeAreas: horoscope.challengeAreas,
  };
}

function getCharacterDescription(zodiacIndex: number): string {
  const descriptions: Record<number, string> = {
    0: "Người tuổi Tý thông minh, nhanh nhạy và tháo vát trong công việc. Họ có khả năng quan sát cực kỳ tốt, luôn chuẩn bị một bước trước người khác. Tính cách của Tý vừa nhạy bén vừa cảnh giác, nên họ ít khi bị lừa dối. Tuy nhiên, Tý có xu hướng lo lắng quá mức và đôi khi quá tính toán trong các mối quan hệ.",
    1: "Người tuổi Sửu có tính chăm chỉ, kiên trì và đáng tin cậy trong các mối quan hệ. Họ không thích nói nhiều nhưng hành động rất thực tế. Sửu có sức chịu đựng phi thường và là những người lý tưởng để dựa vào trong khó khăn. Tính ổn định và đúng mực của Sửu khiến họ được mọi người tôn trọng.",
    2: "Người tuổi Dần có tính cách mạnh mẽ, dũng cảm và sẵn sàng đối mặt với thách thức. Họ có tinh thần lãnh đạo tự nhiên và thường xung phong trong những tình huống khó khăn. Dần có lòng trắc ẩn cao nhưng cũng rất quyết đoán khi cần thiết. Tính nóng nảy đôi khi là nhược điểm của Dần.",
    3: "Người tuổi Mão có tính tình dịu dàng, ngoại giao giỏi và hòa nhập dễ dàng vào bất kỳ hoàn cảnh nào. Họ yêu thích sự tự do và không thích bị ràng buộc. Mão là những người sáng tạo, tự do tư tưởng và luôn tìm kiếm những trải nghiệm mới lạ.",
    4: "Người tuổi Thìn có tính cách hùng hồn, vị tha và khát vọng cao. Họ tự tin, đầy năng lượng và luôn muốn đạt được những mục tiêu lofty. Thìn thường là những người lãnh đạo tự nhiên với khả năng truyền cảm hứng cho những người xung quanh. Tuy nhiên, Thìn đôi khi có thể quá tự tin và không nghe lời khuyên.",
    5: "Người tuổi Tỵ sâu sắc, tư duy logic và có ác mộng cảm cơ tốt. Họ thích suy ngẫm về ý nghĩa cuộc sống và có nhu cầu tâm linh cao. Tỵ rất trung thành với những người họ yêu quý và là bạn đồng hành đáng tin cậy. Tính cách nội tâm của Tỵ khiến họ có thể hiểu rõ tâm lý con người.",
    6: "Người tuổi Ngọ năng động, tình cảm và giao tiếp tự nhiên. Họ yêu thích cuộc sống xã hội và luôn là tâm điểm của các bữa tiệc. Ngọ có sức hút tự nhiên và được mọi người yêu thích. Tuy nhiên, Ngọ đôi khi thiếu kiên nhẫn và dễ thay đổi quyết định.",
    7: "Người tuổi Mùi có tính chân thành, chu đáo và ưu tiên gia đình hơn bất cứ điều gì. Họ là người chăm sóc tự nhiên và luôn sẵn sàng giúp đỡ người khác. Mùi có tâm hồn nhạy cảm và cần được yêu thương để có thể phát triển tốt nhất.",
    8: "Người tuổi Thân thông minh, hoạt bát và nhanh chóng thích ứng với các tình huống mới. Họ là những người vui vẻ, hài hước và có khả năng giao tiếp xuất sắc. Thân có khát vọng học hỏi liên tục và thích khám phá những điều mới lạ.",
    9: "Người tuổi Dậu chi tiết, chính xác và có tiêu chuẩn cao cho bản thân và người khác. Họ là những người hoàn hảo chủ nghĩa và luôn cố gắng làm tốt nhất trong mọi việc. Dậu rất tôn trọng quy tắc và giá trị đạo đức.",
    10: "Người tuổi Tuất trung thành, vững chắc và đáng tin cậy trong bất kỳ hoàn cảnh nào. Họ có lòng công bằng mạnh mẽ và sẵn sàng đứng lên cho những điều họ tin tưởng. Tuất là những người bạn tuyệt vời và người thân yêu tuyệt vời.",
    11: "Người tuổi Hợi hòa nhân, chan chứa và dễ thương. Họ có trái tim lớn và yêu thương con người một cách chân thành. Hợi là những người vui vẻ, lạc quan và luôn tìm kiếm hạnh phúc trong cuộc sống.",
  };

  return descriptions[zodiacIndex] || descriptions[0];
}

function getCareerDescription(zodiacIndex: number): string {
  const descriptions: Record<number, string> = {
    0: "Người tuổi Tý thường thành công trong những công việc đòi hỏi tư duy nhanh nhạy và khả năng phân tích. Họ phù hợp với các vị trí kinh doanh, tài chính hoặc những công việc liên quan đến giao tiếp. Tý có khả năng tiết kiệm và quản lý tài chính tốt, nên thường tích lũy được sự giàu có.",
    1: "Người tuổi Sửu thành công trong các công việc đòi hỏi kiên nhẫn và tính cẩn thận. Họ phù hợp với công nghệ, thủ công, nông nghiệp hoặc những công việc cần độ tin cậy cao. Sửu không nhanh giàu nhưng có tài năng tích lũy tài sản lâu dài.",
    2: "Người tuổi Dần là những người lãnh đạo tự nhiên và thường chiếm các vị trí quản lý. Họ thành công trong các công việc đòi hỏi dũng cảm, quyết đoán và khả năng chịu áp lực. Dần có năng lực to lớn về sự nghiệp nhưng cần học cách hợp tác tốt hơn.",
    3: "Người tuổi Mão phù hợp với các công việc sáng tạo, nghệ thuật hoặc truyền thông. Họ có khả năng thích ứng cao và có thể thay đổi nghề nghiệp khi cần. Mão thường thành công trong các lĩnh vực đòi hỏi sự linh hoạt và sáng tạo.",
    4: "Người tuổi Thìn có năng lực lớn về sự nghiệp và thường đạt những thành tựu cao. Họ phù hợp với các công việc đòi hỏi năng lượng cao, tầm nhìn xa và khả năng lãnh đạo. Thìn có thể thành công trong hầu hết các lĩnh vực nếu họ kiên trì.",
    5: "Người tuổi Tỵ thành công trong các công việc liên quan đến tư duy sâu, nghiên cứu hoặc những lĩnh vực có tính triết học. Họ phù hợp với giảng dạy, tâm lý học, hoặc những công việc cần sự hiểu biết sâu sắc về con người.",
    6: "Người tuổi Ngọ thành công trong các công việc đòi hỏi giao tiếp, thuyết phục hoặc công khai. Họ phù hợp với bán hàng, quản lý nhân sự, hoặc những công việc liên quan đến đối nhân xử sự. Ngọ thường được yêu mến bởi đồng nghiệp.",
    7: "Người tuổi Mùi phù hợp với các công việc liên quan đến chăm sóc, dịch vụ hoặc tạo sự hoà hợp. Họ thành công trong lĩnh vực chăm sóc sức khỏe, giáo dục hoặc những công việc đòi hỏi sự chu đáo.",
    8: "Người tuổi Thân phù hợp với các công việc đòi hỏi tính linh hoạt, giao tiếp và khả năng học hỏi nhanh. Họ có thể thành công trong nhiều lĩnh vực khác nhau nhờ khả năng thích ứng cao. Thân thường được yêu mến trong môi trường làm việc.",
    9: "Người tuổi Dậu thành công trong các công việc đòi hỏi sự chính xác, chi tiết và tiêu chuẩn cao. Họ phù hợp với kế toán, kiến trúc, thiết kế hoặc những công việc cần sự tỉ mỉ. Dậu là những người siêng năng và có thể đạt những thành tựu lớn.",
    10: "Người tuổi Tuất là những người làm việc chăm chỉ và trung thành đối với công việc của mình. Họ phù hợp với công việc cần độ tin cậy cao, quản lý hoặc những công việc liên quan đến công lý. Tuất có thể thành công nếu họ tin tưởng vào bản thân.",
    11: "Người tuổi Hợi thành công trong các công việc liên quan đến dịch vụ, giáo dục hoặc những lĩnh vực có tính nhân văn. Họ có đạo đức cao và thường được mọi người tôn trọng. Hợi có khả năng làm việc nhóm tốt và là các đồng nghiệp đáng tin cậy.",
  };

  return descriptions[zodiacIndex] || descriptions[0];
}

function getLoveDescription(zodiacIndex: number): string {
  const descriptions: Record<number, string> = {
    0: "Trong tình yêu, Tý là những người lãng mạn nhưng cũng rất cảnh giác. Họ cần một đối tác có thể hiểu được sự lo lắng và suy tính của mình. Tý tìm kiếm một mối quan hệ sâu sắc và ý nghĩa, không phải chỉ là sự hấp dẫn bề ngoài.",
    1: "Sửu là những người vợ/chồng tuyệt vời vì sự trung thành và ổn định của họ. Họ sẵn sàng xây dựng một gia đình lâu dài và hy sinh cho những người họ yêu. Tuy nhiên, Sửu cần học cách bày tỏ cảm xúc của mình tốt hơn.",
    2: "Dần là những người lãng mạn và đầy passion. Họ yêu mạnh mẽ và sẵn sàng bảo vệ người yêu. Tuy nhiên, Dần cần kiểm soát tính nóng nảy của mình để tránh xung đột trong tình yêu.",
    3: "Mão là những người bạn đời vui vẻ và thú vị. Họ yêu thích sự tự do nhưng cũng cần được yêu thương. Mão tìm kiếm một đối tác có thể chia sẻ những cuộc phiêu lưu cùng mình.",
    4: "Thìn là những người lãng mạn và đầy tình cảm. Họ muốn một mối quan hệ mà cả hai bên đều phát triển và thành công. Thìn có thể quá khó tính và cần học cách chấp nhận những bất hoàn hảo.",
    5: "Tỵ là những người bạn đời trung thành và sâu sắc. Họ tìm kiếm một mối quan hệ có kết nối tinh thần mạnh. Tỵ có thể là người cố chấp và cần học cách linh hoạt hơn.",
    6: "Ngọ là những người vợ/chồng lãng mạn và đầy tình cảm. Họ muốn một mối quan hệ đầy hạnh phúc và vui vẻ. Ngọ có thể quá nôn nóng và cần học cách bình tĩnh hơn.",
    7: "Mùi là những người chăm sóc và hy sinh vì gia đình. Họ tìm kiếm một đối tác có thể đánh giá cao sự nỗ lực của họ. Mùi cần học cách yêu chính mình cũng như yêu người khác.",
    8: "Thân là những người bạn đời vui vẻ và thú vị. Họ yêu thích những mối quan hệ năng động và đầy bất ngờ. Thân cần học cách kiên định hơn để duy trì một mối quan hệ dài hạn.",
    9: "Dậu là những người chọn lọc trong tình yêu. Họ cần một đối tác có thể đáp ứng tiêu chuẩn cao của mình. Dậu cần học cách chấp nhận những bất hoàn hảo để tìm được hạnh phúc.",
    10: "Tuất là những người trung thành và tin tưởng trong tình yêu. Họ xây dựng những mối quan hệ vững chắc dựa trên sự tin tưởng. Tuất cần học cách bày tỏ cảm xúc của mình tốt hơn.",
    11: "Hợi là những người lãng mạn và yêu thương mạnh mẽ. Họ sẵn sàng hy sinh cho người họ yêu. Hợi cần học cách bảo vệ bản thân để tránh bị tổn thương.",
  };

  return descriptions[zodiacIndex] || descriptions[0];
}

function getHealthDescription(zodiacIndex: number): string {
  const descriptions: Record<number, string> = {
    0: "Về sức khỏe, Tý cần chú ý đến tâm lý vì họ có xu hướng lo lắng quá mức. Họ nên tập thể dục thường xuyên để giải tỏa stress và duy trì năng lượng.",
    1: "Sửu thường có sức khỏe bền bỉ nhưng cần chú ý đến vấn đề tiêu hóa vì thói quen ăn uống. Họ nên duy trì lối sống lành mạnh và tập thể dục thường xuyên.",
    2: "Dần có năng lượng cao nhưng dễ bị chấn thương do tính nóng tính. Họ nên tìm những cách để xả stress một cách an toàn như tập thể dục hoặc yoga.",
    3: "Mão thường có sức khỏe tốt nhưng cần chú ý đến sự mất ngủ vì tính bồn chồn. Họ nên tìm những hoạt động thư giãn để cân bằng năng lượng.",
    4: "Thìn có thể gặp vấn đề với sức khỏe nếu quá tải công việc. Họ cần học cách thư giãn và xác định ưu tiên cho sức khỏe.",
    5: "Tỵ có xu hướng có vấn đề về thần kinh hoặc tâm lý. Họ nên thực hành thiền định hoặc yoga để duy trì sự cân bằng.",
    6: "Ngọ thường có sức khỏe tốt nhưng cần chú ý đến vấn đề tim mạch do tính nóng nảy. Họ nên duy trì hoạt động thể chất thường xuyên.",
    7: "Mùi có xu hướng lo lắng về sức khỏe. Họ nên tìm những hoạt động thư giãn như đi bộ hoặc làm vườn.",
    8: "Thân thường có sức khỏe tốt nhưng cần chú ý đến chấn thương. Họ nên thực hành các hoạt động an toàn để duy trì sức khỏe.",
    9: "Dậu có xu hướng có vấn đề về tiêu hóa. Họ nên chú ý đến chế độ ăn uống và duy trì lối sống lành mạnh.",
    10: "Tuất thường có sức khỏe bền bỉ. Họ nên duy trì hoạt động thể chất thường xuyên để kiểm soát cân nặng.",
    11: "Hợi có xu hướng có vấn đề với quản lý cân nặng. Họ nên thực hành tập thể dục thường xuyên và duy trì chế độ ăn uống lành mạnh.",
  };

  return descriptions[zodiacIndex] || descriptions[0];
}
