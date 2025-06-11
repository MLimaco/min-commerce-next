export interface Product {
id: string;
title: string;
price: number;
imageUrl: string;
category: string;
onSale?: boolean;
}

export const products: Array<Product> = [
  {
    id: "prod-001",
    title: "Camiseta de algodón premium",
    price: 29.99,
    imageUrl: "https://http2.mlstatic.com/D_NQ_NP_729777-MPE85763771711_062025-O-polo-oversize-gym-polo-deportivo-ropa-fitness.webp",
    category: "ropa",
    onSale: true
  },
  {
    id: "prod-002",
    title: "Auriculares inalámbricos",
    price: 89.99,
    imageUrl: "https://http2.mlstatic.com/D_NQ_NP_666801-MLU78561485777_082024-O.webp",
    category: "electrónica",
    onSale: false
  },
  {
    id: "prod-003",
    title: "Zapatillas deportivas",
    price: 59.99,
    imageUrl: "https://http2.mlstatic.com/D_NQ_NP_987588-MPE81602262558_012025-O-zapatos-zapatillas-de-cuero-nobuck.webp",
    category: "calzado",
    onSale: true
  },
  {
    id: "prod-004",
    title: "Laptop ultraligera 15",
    price: 899.99,
    imageUrl: "https://http2.mlstatic.com/D_NQ_NP_880084-MLU72968654580_112023-O.webp",
    category: "electrónica",
    onSale: false
  },
  {
    id: "prod-005",
    title: "Mochila impermeable",
    price: 45.50,
    imageUrl: "https://http2.mlstatic.com/D_NQ_NP_753340-MLU75858976069_042024-O.webp",
    category: "accesorios",
    onSale: true
  },
  {
    id: "prod-006",
    title: "Smartwatch fitness",
    price: 129.99,
    imageUrl: "https://http2.mlstatic.com/D_NQ_NP_826759-MLA80563772262_112024-O.webp",
    category: "electrónica",
    onSale: true
  },
  {
    id: "prod-007",
    title: "Jeans slim fit",
    price: 49.99,
    imageUrl: "https://http2.mlstatic.com/D_NQ_NP_693678-MPE80975390119_112024-O-pantalon-drill-para-hombre-slim-fit-semipitillo.webp",
    category: "ropa",
    onSale: false
  },
  {
    id: "prod-008",
    title: "Cafetera automática",
    price: 79.99,
    imageUrl: "https://http2.mlstatic.com/D_NQ_NP_625425-MLA51199487010_082022-O.webp",
    category: "hogar",
    onSale: false
  },
  {
    id: "prod-009",
    title: "Teclado mecánico RGB",
    price: 69.99,
    imageUrl: "https://http2.mlstatic.com/D_NQ_NP_809928-MLA83084895244_032025-O.webp",
    category: "electrónica",
    onSale: true
  },
  {
    id: "prod-010",
    title: "Chaqueta impermeable",
    price: 79.99,
    imageUrl: "https://http2.mlstatic.com/D_NQ_NP_700695-MPE47036287075_082021-O-bombert-jacket-de-hombre-chaquete-de-hombre-casaca.webp",
    category: "ropa",
    onSale: false
  },
  {
    id: "prod-011",
    title: "Set de sartenes antiadherentes",
    price: 119.99,
    imageUrl: "https://http2.mlstatic.com/D_NQ_NP_919421-MLU79186658155_092024-O.webp",
    category: "hogar",
    onSale: true
  },
  {
    id: "prod-012",
    title: "Gafas de sol polarizadas",
    price: 39.99,
    imageUrl: "https://http2.mlstatic.com/D_NQ_NP_957497-MLA82475747763_022025-O.webp",
    category: "accesorios",
    onSale: false
  },
  {
    id: "prod-013",
    title: "Altavoz Bluetooth portátil",
    price: 49.99,
    imageUrl: "https://http2.mlstatic.com/D_NQ_NP_618729-MLA82429562030_022025-O.webp",
    category: "electrónica",
    onSale: true
  },
  {
    id: "prod-014",
    title: "Bolso de cuero genuino",
    price: 89.99,
    imageUrl: "https://http2.mlstatic.com/D_NQ_NP_937592-MLA84398529764_052025-O.webp",
    category: "accesorios",
    onSale: false
  },
  {
    id: "prod-015",
    title: "Bicicleta urbana",
    price: 299.99,
    imageUrl: "https://http2.mlstatic.com/D_NQ_NP_955253-MLU77443475280_072024-O.webp",
    category: "deportes",
    onSale: true
  },
  {
    id: "prod-016",
    title: "Set de cuchillos profesionales",
    price: 149.99,
    imageUrl: "https://http2.mlstatic.com/D_NQ_NP_607274-MLU72827254040_112023-O.webp",
    category: "hogar",
    onSale: false
  },
  {
    id: "prod-017",
    title: "Vestido elegante",
    price: 69.99,
    imageUrl: "https://http2.mlstatic.com/D_NQ_NP_874214-MPE70367136018_072023-O-vestido-nina-blanco-little-girl-white-genieka.webp",
    category: "ropa",
    onSale: true
  },
  {
    id: "prod-018",
    title: "Monitor curvo 27 pulgadas",
    price: 249.99,
    imageUrl: "https://http2.mlstatic.com/D_NQ_NP_651708-MLA84562695952_052025-O.webp",
    category: "electrónica",
    onSale: false
  },
  {
    id: "prod-019",
    title: "Balones de fútbol profesional",
    price: 35.99,
    imageUrl: "https://http2.mlstatic.com/D_NQ_NP_712539-MLU78223547035_082024-O.webp",
    category: "deportes",
    onSale: true
  },
  {
    id: "prod-020",
    title: "Planta artificial decorativa",
    price: 24.99,
    imageUrl: "https://http2.mlstatic.com/D_NQ_NP_849609-MPE51446744500_092022-O-tiras-de-hojas-artificiales-decorativas-pack-de-12-u.webp",
    category: "hogar",
    onSale: false
  }
];