export const listMenu: Menu[] = [
  // {
  //   path: '',
  //   icon: 'setting',
  //   title: 'Control',
  //   listChildren: [
  //     {
  //       path: '/admin/test',
  //       name: 'test',
  //       icon: '',
  //       title: 'Example',
  //     },
  //     {
  //       path: '/admin/kendogrid',
  //       name: 'kendogrid',
  //       icon: '',
  //       title: 'Kendo Grid',
  //     },
  //   ],
  // },
  {
    path: '',
    icon: 'appstore',
    title: 'Danh mục',
    listChildren: [
      {
        path: '/admin/category',
        name: 'category',
        icon: '',
        title: 'Loại danh mục',
      },
      {
        path: '/admin/exam-shop',
        name: 'exam-shop',
        icon: 'shop',
        title: 'Cửa hàng',
      },
      {
        path: '/admin/exam-product',
        name: 'exam-product',
        icon: 'shop',
        title: 'Sản phẩm',
      },
      {
        path: '/admin/exam-customer',
        name: 'exam-customer',
        icon: 'shop',
        title: 'Khách hàng',
      },
      {
        path: '/admin/test',
        name: 'test',
        icon: 'shop',
        title: 'Test',
      },
    ],
  },
  {
    path: '',
    icon: 'apartment',
    title: 'Nghiệp vụ',
    listChildren: [
      {
        path: '',
        icon: '',
        title: 'Tăng ca',
        listChildren: [
          {
            path: '/admin/overtime',
            name: 'overtime',
            icon: '',
            title: 'Tăng ca',
          },
          { path: '', icon: '', title: 'Phê duyệt tăng ca' },
        ],
      },
    ],
  },
  {
    path: '',
    icon: 'appstore',
    title: 'Learn Vocabulary',
    listChildren: [
      {
        path: '/admin/learn-vocabulary',
        name: 'learn-vocabulary',
        icon: '',
        title: 'Revise',
      },
      {
        path: '/admin/game-vocabulary',
        name: 'game-vocabulary',
        icon: '',
        title: 'Vocab Game',
      },
    ],
  },
];

export class Menu {
  path!: string;
  name?: string;
  icon!: string;
  title!: string;
  listChildren?: Menu[];
}
