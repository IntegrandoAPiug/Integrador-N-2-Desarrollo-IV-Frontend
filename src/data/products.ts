export interface Product {
    id: number
    nombre: string
    precio:number
    stock: number
    categoria: string
    img: string
    descripcion: string
}

export const products: Product[] = [
    {
        id: 1,
        nombre: 'Torta de Chocolate',
        precio: 25000,
        stock: 10,
        categoria: 'Tortas',
        img: 'https://www.solopostres.com/wp-content/uploads/2025/06/Torta-humeda-de-chocolate-casera-800x800.jpg',
        descripcion: "Deliciosa torta de chocolate negro 70% cacao, con relleno de ganache y cubierta de crema batida. Perfecta para celebraciones."
    },
    {
        id: 2,
        nombre: 'Cheesecake de Frutos Rojos',
        precio: 22000,
        stock: 5,
        categoria: 'Tartas',
        img: 'https://acdn-us.mitiendanube.com/stores/002/284/314/products/53db5631-8acc-4816-85ca-02f251c3d33b-926ede26531a80b24417087259126029-480-0.webp',
        descripcion: "Cremoso cheesecake sobre base de galleta, cubierto con abundantes frutos rojos frescos."
    },
    {
        id: 3,
        nombre: 'Caja de alfajores de Maicena',
        precio: 8500,
        stock: 20,
        categoria: 'Alfajores',
        img: 'https://acdn-us.mitiendanube.com/stores/003/312/466/products/maicena-11-9411075d3dc62d64b216876162881640-1024-1024.webp',
        descripcion: "Los clásicos alfajorcitos de maicena, bien rellenos de dulce de leche y con coco rallado por los bordes."
    },
    {
        id: 4,
        nombre: 'Tarta de Manzana',
        precio: 16000,
        stock: 6,
        categoria: 'Tartas',
        img: 'https://content-cocina.lecturas.com/medio/2018/07/19/tarta-de-manzana-rellena_8bdd481e_800x800.jpg',
        descripcion: "Tarta tradicional de manzana con masa quebrada, relleno de manzanas caramelizadas y toque de canela."
    },
    {
        id: 5,
        nombre: 'Pastafrola de Membrillo',
        precio: 10000,
        stock: 12,
        categoria: 'Tartas',
        img: 'https://www.revistagente.com/wp-content/uploads/2026/03/pastafrola-620x464.jpg.webp',
        descripcion: "Pastafrola casera como la de la abuela, con masa quebradiza de vainilla y mucho membrillo. Ideal para acompañar con unos mates."
    },
    {
        id: 6,
        nombre: 'Caja de Masitas Finas',
        precio: 9500,
        stock: 15,
        categoria: 'Galletas',
        img: 'https://acdn-us.mitiendanube.com/stores/001/181/412/products/masas1kg1-7a6ddf55715e16405217580719279071-640-0.webp',
        descripcion: "Medio kilo de masitas secas surtidas: palmeritas, pepas, vainillas, mantecadas y más. Nunca pueden faltar."
    },
    {
        id: 7,
        nombre: 'Rogel de Dulce de Leche',
        precio: 15000,
        stock: 3,
        categoria: 'Tortas',
        img: 'https://cdn.cookwithbelula.com/receta/rogel/rogel-4x3.webp',
        descripcion: "Torre de capas crocantes de masa fina con abundande dulce de leche repostero y cubierto de merengue italiano. Un clásico de los cumpleaños."
    },
    {
        id: 8,
        nombre: 'Chocotorta',
        precio: 32000,
        stock: 15,
        categoria: 'Tortas',
        img: 'https://www.annarecetasfaciles.com/files/chocotorta-1-1-1024x575.jpg',
        descripcion: "La chocotorta de toda la vida, con galletitas de chocolate, dulce de leche y crema. Bien fresquita, ideal para los más chicos."
    },
    {
        id: 9,
        nombre: 'Torta Balcarce',
        precio: 20500,
        stock: 6,
        categoria: 'Tortas',
        img: 'https://imgs.search.brave.com/WKKP_7PqqJPZg28zkOBljRd2qqhS6b3-q04RlhS1A9w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZWxudWV2ZS5jb20u/YXIvc2l0ZXMvZGVm/YXVsdC9maWxlcy8y/MDIzLTEyL0JBTENB/UkNFJTIwUE9TVFJF/LnBuZw',
        descripcion: "Postre nacional hecho con capas de bizcochuelo, dulce de leche, crema, merengue y castañas. ¡Un clásico de años!"
    },
    {
        id: 10,
        nombre: 'Pepas de Membrillo',
        precio: 3000,
        stock: 30,
        categoria: 'Galletas',
        img: 'https://imgs.search.brave.com/NbPUI3DlmNUKY35UDW8s3NOo_FEECofOQCGkWTKa1lY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Y3JvbmljYS5jb20u/YXIvZmlsZXMvaW1h/Z2UvMTY2MC8xNjYw/NzUxLzZhMGM1MmYx/OWZlY2VfOTkyXzU1/OCEuanBnP3M9NTc3/MmU4NmUxMWRjMGJl/YTY1ZWQyZDE3NTNk/ODk4ZWUmZD0xNzc5/MTU5NjAw',
        descripcion: "Pepitas caseras de masa sableé con mucho membrillo en el centro y coco rallado."
    },
    {
        id: 11,
        nombre: 'Lemon Pie',
        precio: 9500,
        stock: 9,
        categoria: 'Tartas',
        img: 'https://www.annarecetasfaciles.com/files/lemon-pie-815x458.jpg',
        descripcion: "Tarta de limón con masa sableé crocante, crema de limón bien ácida y merengue italiano tostado. Refrescante y livianito."
    },
    {
        id: 12,
        nombre: 'Torta Red Velvet',
        precio: 14500,
        stock: 5,
        categoria: 'Tortas',
        img: 'https://www.infobae.com/resizer/v2/52E6H6YM2NHAHHAR6S7SL47SEM.jpg?auth=297e571a58ee99c362d9f16fab0b2dafa6ffba5a019ccd898a7c4741312ce74f&smart=true&width=992&height=556&quality=85',
        descripcion: "Torta red velvet de cuatro capas con frosting de queso crema, bien húmeda y suavecita. Decorada con frutos rojos frescos, un lujo."
    },
    {
        id: 13,
        nombre: 'Torta Selva Negra',
        precio: 32000,
        stock: 12,
        categoria: 'Tortas',
        img: 'https://www.nuria.com.ar/wp-content/uploads/2018/11/Confiteria-Nuria-2018-24.jpg',
        descripcion: "Bizcochuelo de chocolate, crema chantilly, cerezas confitadas y virutas de chocolate. Un clásocp de las fiestas de fin de año."
    },
    {
        id: 14,
        nombre: 'Tarta de Frutillas con Crema',
        precio: 19500,
        stock: 3,
        categoria: 'Tartas',
        img: 'https://resizer.glanacion.com/resizer/v2/tarta-de-frutillas-con-crema-PYKAP3ZRK5BPFOHDRV4S7IPXEM.jpg?auth=e79c6ab37f8944ed7dd7512481aa99edb2437d1f2d32c519f3812ce90423b0e2&width=880&height=586&quality=70&smart=true',
        descripcion: "Base de masa sableé rellena con crema chantilly y frutillas frescas de estación, con un toque de brillo de mermelada. Fresquita y tentadora."
    },
    {
        id: 15,
        nombre: 'Torta Tres Leches',
        precio: 25000,
        stock: 7,
        categoria: 'Tortas',
        img: 'https://cdn0.recetasgratis.net/es/posts/0/1/9/torta_tres_leches_8910_1200.jpg',
        descripcion: "Bizcochuelo súper húmedo bañado en mezcla de tres leches, cubierto con crema batida y canela. Bien rendidora, para compartir en familia."
    }
]