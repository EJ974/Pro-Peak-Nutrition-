const productos = [
  /* =======================
     PROTEÍNAS
  ======================= */

  {
    id: 1,
    nombre: "Whey Protein Premium",
    categoria: "proteinas",
    subcategoria: "whey",
    marca: "ENA",
    objetivo: "masa muscular",
    precio: 14500,
    vendidos: 180,
    fecha: "2025-03-01",
    imagen: "https://landerfit.com/wp-content/uploads/2022/12/PREMIUM-WHEY-Banana-Split.jpg",
    descripcion: "Proteína whey ideal para desarrollo muscular y recuperación."
  },

  {
    id: 2,
    nombre: "Whey Isolate Zero",
    categoria: "proteinas",
    subcategoria: "isolate",
    marca: "Star Nutrition",
    objetivo: "definicion",
    precio: 18900,
    vendidos: 140,
    fecha: "2025-02-10",
    imagen: "https://per4mbetter.com/cdn/shop/files/per4m-vanilla-creme-isolate-protein-powder-900g.png?v=1749655683&width=1920",
    descripcion: "Proteína aislada baja en carbohidratos y grasas."
  },

  {
    id: 3,
    nombre: "Mass Gainer Pro",
    categoria: "proteinas",
    subcategoria: "gainer",
    marca: "Body Advance",
    objetivo: "masa muscular",
    precio: 17200,
    vendidos: 120,
    fecha: "2025-01-15",
    imagen: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/opn/opn02971/l/57.jpg",
    descripcion: "Ganador de peso con proteínas y carbohidratos."
  },

  {
    id: 4,
    nombre: "Caseína Night Recovery",
    categoria: "proteinas",
    subcategoria: "caseina",
    marca: "HTN",
    objetivo: "recuperacion",
    precio: 15800,
    vendidos: 95,
    fecha: "2025-01-05",
    imagen: "https://oxypronutrition.es/wp-content/uploads/2021/06/oxypro-caseina-1-1500x1500-2.png",
    descripcion: "Proteína de absorción lenta ideal para la noche."
  },

  /* =======================
     CREATINAS
  ======================= */

  {
    id: 5,
    nombre: "Creatina Monohidratada",
    categoria: "creatinas",
    subcategoria: "monohidratada",
    marca: "ENA",
    objetivo: "energia",
    precio: 9800,
    vendidos: 230,
    fecha: "2025-03-05",
    imagen: "https://suplementos.com/new/wp-content/uploads/2024/09/creatina-300gr-DoyPack-Star-Nutrition-500x647.png",
    descripcion: "Mejora fuerza, potencia y recuperación."
  },

  {
    id: 6,
    nombre: "Creatina Micronizada",
    categoria: "creatinas",
    subcategoria: "micronizada",
    marca: "Star Nutrition",
    objetivo: "energia",
    precio: 11200,
    vendidos: 190,
    fecha: "2025-02-20",
    imagen: "https://www.farmacialeloir.com.ar/img/articulos/2023/01/ena_creatina_micronizada_en_polvo_imagen1.jpg",
    descripcion: "Mayor absorción y mejor digestión."
  },

  {
    id: 7,
    nombre: "Creatina Ultra Pure",
    categoria: "creatinas",
    subcategoria: "premium",
    marca: "Universal",
    objetivo: "masa muscular",
    precio: 11900,
    vendidos: 130,
    fecha: "2025-02-01",
    imagen: "https://http2.mlstatic.com/D_NQ_NP_653880-MLA52485481677_112022-O.webp",
    descripcion: "Creatina pura para fuerza y volumen."
  },

  /* =======================
     PRE ENTRENOS
  ======================= */

  {
    id: 8,
    nombre: "Pre Workout Energy",
    categoria: "preentrenos",
    subcategoria: "energia",
    marca: "HTN",
    objetivo: "energia",
    precio: 10900,
    vendidos: 170,
    fecha: "2025-03-10",
    imagen: "https://d2eebw31vcx88p.cloudfront.net/selmadigital/uploads/5dc41b48d74e6cda5dcba2fd2df07dac41485469.jpg.webp",
    descripcion: "Máxima energía y enfoque antes de entrenar."
  },

  {
    id: 9,
    nombre: "Nitro Pump X",
    categoria: "preentrenos",
    subcategoria: "pump",
    marca: "Star Nutrition",
    objetivo: "energia",
    precio: 12500,
    vendidos: 150,
    fecha: "2025-02-25",
    imagen: "https://www.demusculos.com/web/wp-content/uploads/2024/02/nitro-pump-01-genetic.webp",
    descripcion: "Gran congestión muscular y resistencia."
  },

  {
    id: 10,
    nombre: "Explosive Hardcore",
    categoria: "preentrenos",
    subcategoria: "hardcore",
    marca: "ENA",
    objetivo: "energia",
    precio: 13900,
    vendidos: 110,
    fecha: "2025-01-30",
    imagen: "https://proteition.com/cdn/shop/files/proteintion_XPLODE_Cotton_Candy_1.png?v=1730876616&width=1920",
    descripcion: "Pre entreno intenso para entrenamientos avanzados."
  },

  /* =======================
     QUEMADORES
  ======================= */

  {
    id: 11,
    nombre: "Fat Burner Thermo",
    categoria: "quemadores",
    subcategoria: "termogenico",
    marca: "Nutrex",
    objetivo: "definicion",
    precio: 11800,
    vendidos: 200,
    fecha: "2025-03-12",
    imagen: "https://www.pontemasfuerte.com/media/products/5832/thermo-fat-burner-max-1624454698-big.webp",
    descripcion: "Acelera metabolismo y ayuda a definir."
  },

  {
    id: 12,
    nombre: "L-Carnitina Liquid",
    categoria: "quemadores",
    subcategoria: "carnitina",
    marca: "Universal",
    objetivo: "definicion",
    precio: 9800,
    vendidos: 145,
    fecha: "2025-02-18",
    imagen: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/nrx/nrx00541/y/35.jpg",
    descripcion: "Favorece uso de grasa como energía."
  },

  {
    id: 13,
    nombre: "Shred Extreme",
    categoria: "quemadores",
    subcategoria: "definicion",
    marca: "HTN",
    objetivo: "definicion",
    precio: 13200,
    vendidos: 125,
    fecha: "2025-01-20",
    imagen: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/anh/anh20706/l/8.jpg",
    descripcion: "Ideal para etapas de definición muscular."
  }
];

export default productos;