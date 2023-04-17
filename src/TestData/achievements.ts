import { TAchieves } from '../types';

//FIXME change condition to normal
export const achievements: TAchieves[] = [
    {
        id: 0,
        condition: 10,
        title: 'Любитель чтения',
        description: 'Прочитать 100 страниц',
        img: require('../../assets/bookStackPin.png'),
    },
    {
        id: 1,
        condition: 15,
        title: 'Фанат чтения',
        description: 'Прочитать 1000 страниц',
        img: require('../../assets/bookPin.png'),
    },
    {
        id: 2,
        condition: 20,
        title: 'Ценитель чтения',
        description: 'Прочитать 10000 страниц',
        img: require('../../assets/pixelGirlPin.png'),
    },
    {
        id: 3,
        condition: 1,
        title: 'Библиотекарь',
        description: 'Прочитать 10 книг',
        img: require('../../assets/librarianPin.png'),
    },
    {
        id: 4,
        condition: 2,
        title: 'Та самая сова из Хогвартса',
        description: 'Прочитать 7 книг о Гарри Поттере',
        img: require('../../assets/owlPin.png'),
    },
    {
        id: 5,
        condition: 3,
        title: 'Холодок по коже',
        description: 'Прочитать 3 книги в жанре хоррор',
        img: require('../../assets/IcePin.png'),
    },
]
