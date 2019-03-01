import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Books } from './books';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService  {
  createDb(){
    const books = [
      {
          id: 1, 
          url: 'https://img3.doubanio.com/view/subject/m/public/s29988481.jpg',
          title: '像火焰像灰烬',
          author: '程姬',
      },
      {
          id: 2, 
          url: 'https://img3.doubanio.com/view/subject/m/public/s30002856.jpg',
          title: '拜占庭帝国史',
          author: '[美] A.A.瓦西列夫',
      },
      {
          id: 3, 
          url: 'https://img3.doubanio.com/view/subject/m/public/s30005383.jpg',
          title: '吴承恩捉妖记 上',
          author: '有时右逝',
      },
      {
          id: 4, 
          url: 'https://img3.doubanio.com/view/subject/m/public/s29952612.jpg',
          title: '生命是什么',
          author: '[以色列]埃迪·普罗斯',
      },
      {
          id: 5, 
          url: 'https://img3.doubanio.com/view/subject/m/public/s29965934.jpg',
          title: '圆屋',
          author: '[美]厄德里克(Louise Erdrich)',
      },
      {
          id: 6, 
          url: 'https://img3.doubanio.com/view/subject/m/public/s29960204.jpg',
          title: '通识',
          author: '日本实业出版社 / [日] 茂木健一郎 主编',
      },
      {
          id: 7, 
          url: 'https://img3.doubanio.com/view/subject/m/public/s30002353.jpg',
          title: '读心师',
          author: '向林',
      },
      {
          id: 8, 
          url: 'https://img1.doubanio.com/view/subject/m/public/s29951649.jpg',
          title: '微精通',
          author: '[英] 罗伯特·特威格尔',
      },
      {
          id: 9, 
          url: 'https://img3.doubanio.com/view/subject/m/public/s29958456.jpg',
          title: '人生最焦虑的就是吃些什么',
          author: '刘汀',
      },
      {
          id: 10, 
          url: 'https://img3.doubanio.com/view/subject/m/public/s29906241.jpg',
          title: '过剩之地',
          author: '[美]莫妮卡·普拉萨德',
      },
    ];
    return {books};
  }
  constructor() { }
  
}
