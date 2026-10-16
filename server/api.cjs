const http = require("http");

const CHUYEN_DI = [
  {
    id: "cd01",
    ten: "Khám phá Cố đô",
    moTa: "Hành trình 2 ngày qua các di tích triều Nguyễn.",
    ngayBatDau: "2026-10-15",
    ngayKetThuc: "2026-10-16",
    trangThai: "da-xong",
    tags: ["lich-su", "van-hoa"],
    luotXem: 42,
    taoLuc: "2026-10-01T00:00:00.000Z",
  },
  {
    id: "cd02",
    ten: "Sông Hương buổi sáng",
    moTa: "Đi thuyền rồng ngắm bình minh trên sông Hương.",
    ngayBatDau: "2026-11-01",
    ngayKetThuc: "2026-11-01",
    trangThai: "du-dinh",
    tags: ["thien-nhien", "van-hoa"],
    luotXem: 18,
    taoLuc: "2026-10-01T00:00:00.000Z",
  },
  {
    id: "cd03",
    ten: "Ẩm thực đường phố",
    moTa: "Tour ăn đêm qua các quán vỉa hè nổi tiếng.",
    ngayBatDau: "2026-10-20",
    ngayKetThuc: "2026-10-20",
    trangThai: "dang-di",
    tags: ["am-thuc", "van-hoa"],
    luotXem: 95,
    taoLuc: "2026-10-05T00:00:00.000Z",
  },
  {
    id: "cd04",
    ten: "Lăng tẩm triều Nguyễn",
    moTa: "Thăm 3 lăng tẩm đẹp nhất: Tự Đức, Khải Định, Minh Mạng.",
    ngayBatDau: "2026-12-01",
    ngayKetThuc: "2026-12-02",
    trangThai: "du-dinh",
    tags: ["lich-su", "lang-tam"],
    luotXem: 7,
    taoLuc: "2026-10-07T00:00:00.000Z",
  },
  {
    id: "cd05",
    ten: "Biển Thuận An",
    moTa: "Nghỉ dưỡng cuối tuần tại bãi biển Thuận An.",
    ngayBatDau: "2026-09-01",
    ngayKetThuc: "2026-09-03",
    trangThai: "da-xong",
    tags: ["bien", "thien-nhien"],
    luotXem: 120,
    taoLuc: "2026-09-01T00:00:00.000Z",
  },
];

const DIEM_DUNG = [
  {
    id: "dd01",
    chuyenDiId: "cd01",
    ten: "Đại Nội Huế",
    diaChi: "Phú Hậu, TP Huế",
    ngay: "2026-10-15",
    thoiGian: "08:00",
    ghiChu: "Nên thuê hướng dẫn viên để hiểu lịch sử.",
    danhGia: 5,
    thuTu: 0,
  },
  {
    id: "dd02",
    chuyenDiId: "cd01",
    ten: "Chùa Thiên Mụ",
    diaChi: "Hương Long, TP Huế",
    ngay: "2026-10-15",
    thoiGian: "14:00",
    ghiChu: "Đẹp nhất lúc hoàng hôn.",
    danhGia: 4,
    thuTu: 1,
  },
  {
    id: "dd03",
    chuyenDiId: "cd01",
    ten: "Lăng Tự Đức",
    diaChi: "Thủy Xuân, TP Huế",
    ngay: "2026-10-16",
    thoiGian: "09:00",
    ghiChu: "Kiến trúc hài hoà thiên nhiên.",
    danhGia: 0,
    thuTu: 2,
  },
  {
    id: "dd04",
    chuyenDiId: "cd03",
    ten: "Chợ Đông Ba",
    diaChi: "Trần Hưng Đạo, TP Huế",
    ngay: "2026-10-20",
    thoiGian: "18:00",
    ghiChu: "Thử bánh bèo, bánh nậm, bánh lọc.",
    danhGia: 5,
    thuTu: 0,
  },
  {
    id: "dd05",
    chuyenDiId: "cd03",
    ten: "Quán bún bò O Nữ",
    diaChi: "Nguyễn Du, TP Huế",
    ngay: "2026-10-20",
    thoiGian: "20:00",
    ghiChu: "Bún bò đậm đà, cay nồng.",
    danhGia: 4,
    thuTu: 1,
  },
];

const NHAT_KY = [
  {
    id: "nk01",
    diemDungId: "dd01",
    camXuc: "tuyet-voi",
    noiDung:
      "Đại Nội rộng lớn, kiến trúc uy nghiêm. Ấn tượng nhất là Ngọ Môn và điện Thái Hoà.",
    hinh: "https://placehold.co/400x300?text=Dai+Noi",
  },
  {
    id: "nk02",
    diemDungId: "dd02",
    camXuc: "vui",
    noiDung:
      "Chùa Thiên Mụ yên tĩnh, tháp Phước Duyên cao vút. Gió sông Hương mát rượi.",
    hinh: "https://placehold.co/400x300?text=Thien+Mu",
  },
  {
    id: "nk03",
    diemDungId: "dd04",
    camXuc: "tuyet-voi",
    noiDung: "Chợ Đông Ba đông vui, bán đủ thứ. Ăn no nê mà chỉ hết 100k.",
    hinh: "https://placehold.co/400x300?text=Dong+Ba",
  },
];

function jsonHeaders() {
  return {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "http://localhost:5173",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function traJson(res, status, body) {
  res.writeHead(status, jsonHeaders());
  res.end(JSON.stringify(body));
}

const server = http.createServer((req, res) => {
  const url = req.url ?? "/";
  const method = req.method ?? "GET";

  if (method === "OPTIONS") {
    res.writeHead(204, jsonHeaders());
    res.end();
    return;
  }

  console.log(`[API] ${method} ${url}`);

  if (url === "/api/chuyen-di" && method === "GET") {
    traJson(res, 200, { success: true, data: CHUYEN_DI });
    return;
  }

  const matchCd = url.match(/^\/api\/chuyen-di\/([^/]+)$/);
  if (matchCd && method === "GET") {
    const item = CHUYEN_DI.find((c) => c.id === matchCd[1]);
    if (item) traJson(res, 200, { success: true, data: item });
    else
      traJson(res, 404, {
        success: false,
        message: "Không tìm thấy chuyến đi",
      });
    return;
  }

  if (url.startsWith("/api/diem-dung") && method === "GET") {
    const query = url.split("?")[1] ?? "";
    const params = new URLSearchParams(query);
    const chuyenDiId = params.get("chuyenDiId");
    const data = chuyenDiId
      ? DIEM_DUNG.filter((d) => d.chuyenDiId === chuyenDiId)
      : DIEM_DUNG;
    traJson(res, 200, { success: true, data });
    return;
  }

  if (url.startsWith("/api/nhat-ky") && method === "GET") {
    const query = url.split("?")[1] ?? "";
    const params = new URLSearchParams(query);
    const diemDungId = params.get("diemDungId");
    const data = diemDungId
      ? NHAT_KY.filter((n) => n.diemDungId === diemDungId)
      : NHAT_KY;
    traJson(res, 200, { success: true, data });
    return;
  }

  traJson(res, 404, {
    success: false,
    message: `Route '${url}' không tồn tại`,
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`✓ API server đang chạy tại http://localhost:${PORT}`);
  console.log(`  GET /api/chuyen-di`);
  console.log(`  GET /api/chuyen-di/:id`);
  console.log(`  GET /api/diem-dung?chuyenDiId=...`);
  console.log(`  GET /api/nhat-ky?diemDungId=...`);
});
