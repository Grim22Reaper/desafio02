export interface Productos{
id: number;
name: string;
prices: number;
imagen: string;
category: 'alimentos' | 'bebidas';
}

export const Menu_Data: Productos[] = [
    //platillos
    {id: 1, name: 'Tacos al pastor', prices: 7.50, imagen: 'https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fthestayathomechef.com%2Fwp-content%2Fuploads%2F2024%2F04%2FClassic-Tacos-Al-Pastor_Square-1.jpg&sp=1789084730T9be9a514de0d5d5dd0a79be29950073733aecc8e05c6a27d0217044f06b2f063', category: 'alimentos'},
    {id: 2, name: 'Tacos de carnitas', prices: 6.50, imagen: 'https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fcielitorosado.com%2Fwp-content%2Fuploads%2F2022%2F11%2FCARNITAS-sm.jpg&sp=1789084883Tf4ce1fb408c7dee7e8928ed1906dc65f5f11d536c35c4139dcd28f53e17d8ee2', category: 'alimentos'},
    {id: 3, name: 'tacos de barbacoa', prices: 8.00, imagen: 'https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fsimplementerecetas.com%2Fwp-content%2Fuploads%2F2020%2F01%2FTacos-de-Barbacoa-750x500.png&sp=1789084950Tdf72497748eb8d3a102eebb0b1877fe4a4716a9deb9d75e93e51ab0adfcc91b9', category: 'alimentos'},
    {id: 4, name: 'Tacos de birria', prices: 9.00, imagen: 'https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fcdn.colombia.com%2Fsdi%2F2023%2F08%2F08%2Freceta-para-preparar-tacos-de-birria-1176735.jpg&sp=1789085064Tc3333eb77b6996138b0c64f3be69e5d705b095db4124e404659cd8630f4bef01', category: 'alimentos'},
    {id: 5, name: 'Tacos de pollo', prices: 6.00, imagen: 'https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Ftse3.mm.bing.net%2Fth%2Fid%2FOIP.ThGijO3ogFfkEhcePerc-QHaE8%3Fr%3D0%26pid%3DApi&sp=1789085155T3ce6246da8998ff70e6a22e6c143f6a40b9967167a7f29160eae0366504e99f2', category: 'alimentos'},
    {id: 6, name: 'burrito de pastor', prices: 8.50, imagen: 'https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP._TFoW7zwaMSljiXqS01sBQHaHa%3Fr%3D0%26pid%3DApi&sp=1789085364T7b2e11a730925ede014890920c129add90b45ab0277ae0aa7653143ef804f89d', category: 'alimentos'},
    {id: 7, name: 'burrito de carnitas', prices: 7.50, imagen: 'https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.w3DNPEo8xMyZdMjRgkFapQHaE8%3Fr%3D0%26pid%3DApi&sp=1789085442T7cb102b57f64fb867fb7137fe1d957b123ac03fb9e5ccbcedcc3f7d9bb0013a7', category: 'alimentos'},
    {id: 8, name: 'Quesadilla', prices: 5.00, imagen: 'https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fwww.vvsupremo.com%2Fwp-content%2Fuploads%2F2015%2F11%2F900X570_Two-Cheese-Quesadillas-900x570.jpg&sp=1789085570Tfb73e1869b646149bad4c5197f8659b942590c8814a98450aeff29252115f2c8', category: 'alimentos'},
    {id: 9, name: 'Posole', prices: 6.50, imagen: 'https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fwww.foodandwine.com%2Fthmb%2FMuV16R1GijOi-B7tl7fAcnerwbI%3D%2F1500x0%2Ffilters%3Ano_upscale%28%29%3Amax_bytes%28150000%29%3Astrip_icc%28%29%2Fposole-rojo-ft-RECIPE0818-2d7d7b0f97f94cdcb2115ef63f809341.jpg&sp=1789085663Ta092ad1653d14a50b99a61713423f236927d761a30fb0774758f75ebf5716961', category: 'alimentos'},
    {id: 10, name: 'Tamales' , prices: 4.50, imagen: 'https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fstatic01.nyt.com%2Fimages%2F2023%2F10%2F26%2Fmultimedia%2FRM-tamales-zhwm%2FRM-tamales-zhwm-mediumSquareAt3X.jpg&sp=1789085735T5d13e7ed84953362a44ffffe558099f09c6f9633633ac9a98a590be7dbf2fd5d', category: 'alimentos'},

    //bebidas
    {id: 11, name: 'Horchata', prices: 2.00, imagen: 'https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fcdn0.recetasgratis.net%2Fes%2Fposts%2F5%2F7%2F3%2Fagua_de_horchata_74375_orig.jpg&sp=1789085861Tc1b144551366463f0c0fd5dfc9db90d9bb999bbcb31d59603176fc6b053ecd27', category: 'bebidas'},
    {id: 12, name: 'coca-cola', prices: 1.50, imagen: 'https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F2%2F27%2FCoca_Cola_Flasche_-_Original_Taste.jpg%2F500px-Coca_Cola_Flasche_-_Original_Taste.jpg&sp=1789085957Ta3ca86788cf26d2c48c0098df1af3b1b43ea3143e5d4a63bb5b8b6252f5b5d7d', category: 'bebidas'},
    {id: 13, name: 'Agua de Jamaica', prices: 1.50, imagen: 'https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fwww.simplyrecipes.com%2Fthmb%2FVOhKfkn4jFojglUUSCr5Uj6dcKU%3D%2F1500x0%2Ffilters%3Ano_upscale%28%29%3Amax_bytes%28150000%29%3Astrip_icc%28%29%2FSimply-Recipes-Agua-De-Jamaica-LEAD-04-a177ada5cc504e2bab26fedabb46cb0b.jpg&sp=1789090287Tae2d6f8e9c688d2d0ff8cd2198b81db5e816be1cd25b03b71eea393492acd9f7', category: 'bebidas'},
    {id: 14, name: 'Agua de tamarindo', prices: 1.50, imagen: 'https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fosojimix.mx%2Fwp-content%2Fuploads%2F2022%2F10%2FAGUA-DE-TAMARINDO.jpg&sp=1789090441T9557c9424cf22e411234c696a9572dd80d8f90e37b846405571f13d9754c023e', category: 'bebidas'},
    {id: 15, name: 'Limonada', prices: 1.50, imagen: 'https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fcontais3.s3.amazonaws.com%2Fpublic%2Fseo_posts%2F1744836393_68001729ad689.webp&sp=1789090501Tfb9efdfc4ac47070ff7c78924d291bacac10e5fc601cbd5577ca0a9085d2a9a2', category: 'bebidas'},
];