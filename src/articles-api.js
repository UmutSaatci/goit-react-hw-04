import axios from "axios";

// Headers alanını tamamen temizleyip sadece ham baseURL bırakıyoruz
const api = axios.create({
  baseURL: "https://api.unsplash.com",
});

const searchImages = async (searchTerm, page = 1) => {
  try {
    const response = await api.get("/search/photos", {
      params: {
        // SİHİRLİ NOKTA: Unsplash anahtarını buraya parametre olarak geçiriyoruz
        client_id: "c2V7g4-nDY1Cxv-nR-nbh36Quhi3MT-kPHapFtK57Jw",
        query: searchTerm,
        per_page: 12,
        page: page,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error("Görsel aranırken bir hata oluştu:", error);
    throw error;
  }
};
export default searchImages;
