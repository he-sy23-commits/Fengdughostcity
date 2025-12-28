export interface CardItem {
  title: string;
  titleEn: string;
  content: string;
  image?: string;
}

export interface MenuItem {
  id: string;
  label: string;
  labelEn: string;
  coordinates: string;
  items: CardItem[];
}

export type SectionId = 'origins' | 'architecture' | 'figures' | 'folklore' | 'tickets';

export const SECTIONS: Record<SectionId, MenuItem> = {
  origins: {
    id: 'origins',
    label: '溯源',
    labelEn: 'ORIGINS',
    coordinates: '29°53′N 107°43′E',
    items: [
      {
        title: '道教福地',
        titleEn: 'Blessed Land',
        content: '丰都名山古称“平都山”，系道教七十二福地之一。传说汉代王方平、阴长生在此修道成仙。'
      },
      {
        title: '阴曹地府',
        titleEn: 'Netherworld',
        content: '后人附会“阴、王”为“阴王”，演变为“阴曹地府”之说，成为中国神曲之乡。'
      },
      {
        title: '历史沿革',
        titleEn: 'History',
        content: '自唐代起，名山即建有庙宇，历代修葺，形成了规模宏大的古建筑群。'
      }
    ]
  },
  architecture: {
    id: 'architecture',
    label: '建筑',
    labelEn: 'ARCHITECTURE',
    coordinates: 'ELEVATION: 287M',
    items: [
      {
        title: '奈河桥',
        titleEn: 'Naihe Bridge',
        content: '建于明代，传说为连接阳间与阴曹地府的桥梁，善人易过，恶人难行。',
        image: 'https://images.unsplash.com/photo-1433838552652-f9a46b332c40?q=80&w=600&auto=format&fit=crop'
      },
      {
        title: '鬼门关',
        titleEn: 'Ghost Gate',
        content: '传说中人死后灵魂进入地府的第一道关隘，气势森严，令人望而生畏。',
        image: 'https://images.unsplash.com/photo-1598000534273-0498a442e39e?q=80&w=600&auto=format&fit=crop'
      },
      {
        title: '天子殿',
        titleEn: 'Tianzi Palace',
        content: '名山最高处的古建筑群，主要供奉阎罗天子，是全山的核心建筑。',
        image: 'https://images.unsplash.com/photo-1542645976-15582b13fae3?q=80&w=600&auto=format&fit=crop'
      },
      {
        title: '哼哈祠',
        titleEn: 'Hengha Temple',
        content: '供奉哼哈二将，神态威猛，寓意警醒世人时刻保持正念。',
        image: 'https://images.unsplash.com/photo-1590499092429-1a4d46700465?q=80&w=600&auto=format&fit=crop'
      }
    ]
  },
  figures: {
    id: 'figures',
    label: '人物',
    labelEn: 'FIGURES',
    coordinates: 'DATA_POINTS: 5,420',
    items: [
      {
        title: '药王',
        titleEn: 'Medicine King',
        content: '孙思邈，唐代医药学家，被尊为“药王”。传说他曾在名山采药炼丹，悬壶济世，不仅医术高超，更讲究大医精诚。',
        // Note: In a real app, replace with the specific particle image provided by user. 
        // Using a high-quality placeholder of a statue/figure for now.
        image: 'https://images.unsplash.com/photo-1606733227419-c70a04983053?q=80&w=600&auto=format&fit=crop'
      },
      {
        title: '黑白无常',
        titleEn: 'Impermanence',
        content: '专职缉拿鬼魂的神祇。白无常笑颜常开，黑无常一脸凶煞。',
        image: 'https://images.unsplash.com/photo-1515002246390-7bf7e8f48de1?q=80&w=600&auto=format&fit=crop'
      },
      {
        title: '判官',
        titleEn: 'The Judge',
        content: '左手执生死簿，右手拿勾魂笔，专门审判人的生前善恶。',
        image: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=600&auto=format&fit=crop'
      },
      {
        title: '孟婆',
        titleEn: 'Lady Meng',
        content: '在奈河桥边递送孟婆汤，让人忘却前世记忆，干干净净转世。',
        image: 'https://images.unsplash.com/photo-1516205651411-a85a3c637060?q=80&w=600&auto=format&fit=crop'
      }
    ]
  },
  folklore: {
    id: 'folklore',
    label: '民俗',
    labelEn: 'FOLKLORE',
    coordinates: 'HERITAGE_ID: CN-50',
    items: [
      {
        title: '丰都庙会',
        titleEn: 'Temple Fair',
        content: '每年农历三月三，集巡游、祭祀、演艺于一体的国家级非物质文化遗产。'
      },
      {
        title: '阴天子娶亲',
        titleEn: 'Spirit Marriage',
        content: '极具特色的民俗表演，展示了巴渝地区独特的鬼神文化信仰。'
      },
      {
        title: '烧香祈福',
        titleEn: 'Worship',
        content: '游客在此点燃心香，祈求平安健康，消灾避祸。'
      }
    ]
  },
  tickets: {
    id: 'tickets',
    label: '购票',
    labelEn: 'TICKETS',
    coordinates: 'STATUS: OPEN',
    items: [
      {
        title: '日场门票',
        titleEn: 'Day Pass',
        content: '成人票 ¥90/人。含索道往返。开放时间：08:00 - 17:30。'
      },
      {
        title: '夜游体验',
        titleEn: 'Night Tour',
        content: '沉浸式光影秀，体验不一样的名山之夜。需单独预约。'
      },
      {
        title: '优惠政策',
        titleEn: 'Discount',
        content: '学生、60岁以上老人凭证件半价；1.2米以下儿童免票。'
      }
    ]
  }
};