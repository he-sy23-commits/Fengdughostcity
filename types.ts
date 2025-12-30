export interface SymbolItem {
  name: string;
  description: string;
  iconKey: string; // Key to map to Lucide icons
}

export interface GalleryItem {
  imgUrl: string;
  linkUrl?: string;
  caption: string;
}

export interface ItemDetails {
  bio?: string;
  connection?: string;
  influence?: string;
  symbols?: SymbolItem[];
  gallery?: GalleryItem[];
}

export interface CardItem {
  title: string;
  titleEn: string;
  content: string;
  image?: string;
  link?: string;
  mediaType?: 'video' | 'image';
  imagePosition?: string;
  details?: ItemDetails;
}

export interface MenuItem {
  id: string;
  label: string;
  labelEn: string;
  coordinates: string;
  items: CardItem[];
}

export type SectionId = 'origins' | 'architecture' | 'figures' | 'folklore' | 'heritage' | 'gallery' | 'tickets';

export const SECTIONS: Record<SectionId, MenuItem> = {
  origins: {
    id: 'origins',
    label: '溯源',
    labelEn: 'ORIGINS',
    coordinates: '29°53′N 107°43′E',
    items: [
      {
        title: '道教福地',
        titleEn: 'Taoist Blessed Land',
        content: '丰都名山古称“平都山”，系道教七十二福地之一。传说汉代王方平、阴长生在此修道成仙。',
        image: 'https://raw.githubusercontent.com/he-sy23-commits/Project/main/5.jpg',
        mediaType: 'image',
        details: {
          bio: '丰都名山，古称“平都山”，位于长江北岸，风景秀丽，林木苍翠。在道教文化体系中，它被列为“七十二福地”之一，是修身养性、炼丹求道的理想场所。东汉时期，王方平（曾任中散大夫）与阴长生（汉和帝阴皇后族人）先后弃官来此隐居修道，最终得道飞升。',
          connection: '仙道根基：在成为“鬼城”之前，丰都首先是一座“仙山”。这里的道教文化底蕴深厚，强调清静无为与羽化登仙。这一段历史是丰都文化的底色，说明了此地原本的神圣性与超然性。',
          influence: '福地传说：王、阴二仙的故事广为流传，吸引了历代无数文人墨客来此寻仙访道。苏轼、陆游等大文豪都曾在此留下墨宝。这种“仙气”与后来的“鬼气”相互交织，构成了丰都独特的文化张力。',
          symbols: [
            {
              name: '仙山',
              description: '云雾缭绕的平都山，象征着脱离尘世的修行境界。',
              iconKey: 'mountain'
            },
            {
              name: '丹道',
              description: '二仙炼丹的传说，代表了对生命永恒与精神超越的追求。',
              iconKey: 'wine'
            }
          ]
        }
      },
      {
        title: '阴曹地府',
        titleEn: 'The Netherworld',
        content: '后人附会“阴、王”为“阴王”，演变为“阴曹地府”之说，成为中国神曲之乡。',
        image: 'https://raw.githubusercontent.com/he-sy23-commits/Project/main/6.jpg',
        mediaType: 'image',
        details: {
          bio: '关于丰都如何变为“鬼城”，最著名的说法源于对王方平、阴长生二仙姓氏的误读。后人将“阴、王”二字讹传连读为“阴王”（即阴间之王阎罗王）。加之丰都地理位置独特，经常云雾缭绕，充满神秘感，民间传说与道教信仰逐渐融合，构建了一个完整的幽冥世界体系。',
          connection: '文化误读与重构：这是一个典型的由“误读”引发的文化重构案例。它反映了民间信仰强大的造神能力。人们需要一个具体的空间来承载对死后世界的想象与恐惧，丰都便因缘际会地承担了这一角色。',
          influence: '神曲之乡：随着“鬼城”名声的传播，丰都逐渐成为中国幽冥文化的代表。鬼门关、奈何桥、十八层地狱等景观相继建成，将抽象的阴间概念具象化，成为教化世人、警醒善恶的实景教科书。',
          symbols: [
            {
              name: '阴王',
              description: '由“阴、王”二姓讹变而来的冥界主宰符号。',
              iconKey: 'hat'
            },
            {
              name: '迷雾',
              description: '笼罩在名山上的雾气，为鬼城传说提供了天然的氛围。',
              iconKey: 'wind'
            }
          ]
        }
      },
      {
        title: '历史沿革',
        titleEn: 'Historical Evolution',
        content: '自唐代起，名山即建有庙宇，历代修葺，形成了规模宏大的古建筑群。',
        image: 'https://images.unsplash.com/photo-1542645976-15582b13fae3?q=80&w=600&auto=format&fit=crop',
        mediaType: 'image',
        details: {
          bio: '丰都名山的建筑历史可追溯至汉代，盛于唐宋，完备于明清。唐代已建有仙都观；宋代苏轼父子游览并题诗；明清时期，大规模兴建了天子殿、二仙楼、奈何桥、鬼门关等建筑，形成了“阴曹地府”的完整格局。1982年被列为国家首批风景名胜区。',
          connection: '建筑活化石：名山古建筑群是中国传统建筑与鬼神文化结合的典范。它们依山而建，布局严谨，既有皇家宫殿的威仪（如天子殿），又有园林建筑的幽深（如望乡台）。这些建筑不仅是物理空间，更是文化载体。',
          influence: '文化遗产：作为“中国神曲之乡”，丰都名山不仅是旅游胜地，更是研究中国民俗、宗教、建筑的重要标本。它见证了中国人生死观的演变，记录了千百年来人们对善恶报应的朴素信仰。',
          symbols: [
            {
              name: '古刹',
              description: '历经沧桑的庙宇，承载着千年的香火与信仰。',
              iconKey: 'mountain'
            },
            {
              name: '碑刻',
              description: '历代文人留下的诗词碑刻，记录了名山的文化脉络。',
              iconKey: 'book'
            }
          ]
        }
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
        title: '名山牌坊',
        titleEn: 'Ming Shan Archway',
        content: '宏伟壮丽的石牌坊，是进入丰都名山的第一道景观。它不仅是景区的标志性入口，更象征着从凡尘步入神域的界碑。',
        image: 'https://raw.githubusercontent.com/he-sy23-commits/Project/main/6.jpg',
        mediaType: 'image',
        imagePosition: 'object-[50%_50%]',
        details: {
            bio: '名山牌坊矗立于名山脚下，是进入丰都鬼城景区的标志性建筑。牌坊气势恢宏，结构精巧，飞檐翘角，雕梁画栋。牌坊正中高悬“名山”二字，笔力遒劲。两旁对联寓意深远，警醒世人。作为登山的起点，它见证了无数游人从喧嚣尘世一步步走向幽冥神域的过程。',
            connection: '阴阳界碑：作为名山的门户，它在心理上构建了阴阳两界的分界线。穿过此坊，便意味着暂时告别了现实世界的纷扰，正式踏入了这个充满了神话传说与因果报应的神秘空间。',
            influence: '地标象征：作为游客抵达丰都后的第一印象，名山牌坊已成为丰都旅游不可或缺的视觉符号。它不仅指引着道路，更奠定了整个景区庄重、神秘的文化基调。',
            symbols: [
                {
                    name: '山门',
                    description: '象征着神圣空间的入口，跨过此门即入神域。',
                    iconKey: 'mountain'
                },
                {
                    name: '匾额',
                    description: '“名山”二字点明了此地的地位，非同凡响。',
                    iconKey: 'book'
                }
            ]
        }
      },
      {
        title: '哼哈祠',
        titleEn: 'Hengha Temple',
        content: '供奉哼哈二将，位于名山山门处。神态威猛，睁眼鼓鼻，寓意警醒世人时刻保持正念，分辨善恶。',
        image: 'https://images.unsplash.com/photo-1590499092429-1a4d46700465?q=80&w=600&auto=format&fit=crop',
        details: {
          bio: '哼哈祠位于名山半山腰，是进入鬼城核心区的重要关卡。殿内供奉着“哼哈二将”郑伦和陈奇。郑伦鼻哼白气，陈奇口吐黄气，形象威猛，怒目圆睁，手持降魔杵，时刻警惕地注视着过往行人，防止妖魔鬼怪混入圣地，也震慑着心怀不轨的恶人。',
          connection: '佛道合流：哼哈二将原为佛教护法神，后被纳入封神演义的神话体系，并在丰都鬼城中担任守门神将。这体现了丰都文化中佛、道、俗三教合一的独特包容性，构建了严密的冥界安保体系。',
          influence: '警世意义：二将形象夸张而生动，寓意着“正气凛然，邪不可干”。它们不仅是物理空间上的守门人，更是道德层面上的守望者，提醒人们在进入神圣空间前要摒弃恶念，保持一颗敬畏之心。',
          symbols: [
            {
              name: '白气',
              description: '郑伦鼻中喷出的白光，专吸人魂魄，象征神秘的法力。',
              iconKey: 'wind'
            },
            {
              name: '黄气',
              description: '陈奇口中吐出的黄气，能散人魂魄，象征威慑力。',
              iconKey: 'zap'
            }
          ]
        }
      },
      {
        title: '报恩殿',
        titleEn: 'Temple of Gratitude',
        content: '殿内供奉目连尊者。传说目连之母作恶多端死后堕入地狱，目连在此广施佛法救母，体现中华孝道文化。',
        image: 'https://images.unsplash.com/photo-1600609842388-2950942526dc?q=80&w=600&auto=format&fit=crop',
        details: {
          bio: '报恩殿主要供奉目连尊者（地藏王菩萨的前世之一）。相传目连之母生前不修善果，死后堕入饿鬼道受苦。目连神通广大，见母受苦，遂于七月十五日设盂兰盆会，供养十方僧众，终凭借佛力与孝心救母脱离苦海。殿宇庄严肃穆，香火鼎盛。',
          connection: '孝道核心：报恩殿的存在，将“百善孝为先”的儒家伦理植入幽冥审判体系中。它强调即便在死后世界，亲情与孝道依然是救赎灵魂的重要力量，是连接生者与死者情感纽带的具体体现。',
          influence: '中元节俗：目连救母的故事直接衍生了中国传统的“中元节”（鬼节），形成了祭祖扫墓、普度孤魂的民俗传统。报恩殿因此成为弘扬孝道、劝人为善的重要教化场所。',
          symbols: [
            {
              name: '盂兰盆',
              description: '盛放供品的器皿，象征着汇聚功德与慈悲救赎的力量。',
              iconKey: 'cup'
            },
            {
              name: '锡杖',
              description: '地藏王菩萨（目连）法器，震开地狱之门，救度众生。',
              iconKey: 'axe'
            }
          ]
        }
      },
      {
        title: '奈何桥',
        titleEn: 'Bridge of Helplessness',
        content: '建于明代，传说为连接阳间与阴曹地府的桥梁。桥下血河波涛汹涌，善人易过，恶人难行，是亡魂必经之险。',
        image: 'https://images.unsplash.com/photo-1433838552652-f9a46b332c40?q=80&w=600&auto=format&fit=crop',
        details: {
          bio: '奈何桥始建于明朝永乐年间，原名“通仙桥”，后改为今名。桥为石拱三孔，跨于“血河池”之上。传说人死后亡魂须过此桥，桥分三层：上层金桥善人走，中层银桥常人过，下层黑桥恶人行。桥下血水翻滚，腥风扑面，恶人堕入其中被铜蛇铁狗撕咬，惨不忍睹。',
          connection: '生死试炼：奈何桥是通往地府的必经之路，也是对亡魂生前善恶的第一次物理筛选。它将抽象的道德评判具象化为险峻的桥梁通行，让人们在过桥时产生对因果报应的直观恐惧与敬畏。',
          influence: '文化隐喻：“无可奈何”的成语虽非直接源于此，但奈何桥已成为“无法回头、只能前行”的文化隐喻。它告诫世人，人生没有回头路，生前多行善事，死后方能坦然过桥。',
          symbols: [
            {
              name: '石拱',
              description: '连接彼岸的唯一通道，承载着无数灵魂的重量与叹息。',
              iconKey: 'bridge'
            },
            {
              name: '血河',
              description: '桥下波涛汹涌的血水，象征着罪恶与惩罚的深渊。',
              iconKey: 'waves'
            }
          ]
        }
      },
      {
        title: '鬼门关',
        titleEn: 'Ghost Gate',
        content: '传说中人死后灵魂进入地府的第一道关隘。牌坊气势森严，两旁有十八恶鬼把守，令人望而生畏。',
        image: 'https://images.unsplash.com/photo-1598000534273-0498a442e39e?q=80&w=600&auto=format&fit=crop',
        details: {
          bio: '鬼门关是传说中阴世与阳间的严格分界关卡。现实中的鬼门关是一座石牌坊，森严壁垒。传说人死后，亡魂需持有地府发的“路引”（通行证），经查验无误后方能通过。关前有十八个相貌狰狞的鬼王把守，严防野鬼混入或亡魂逃散。',
          connection: '秩序象征：鬼门关象征着冥界森严的官僚秩序。它表明地府并非混乱之地，而是有着严格的户籍管理与通关制度。路引的查验流程，折射了古代现实社会关隘制度在死后世界的投影。',
          influence: '生死界限：俗语“在鬼门关走了一遭”形象地比喻大难不死。鬼门关成为了极度危险与生死边缘的代名词，深深烙印在中国人的语言与潜意识中。',
          symbols: [
            {
              name: '路引',
              description: '通往地府的通行证，长三尺，黄纸墨书，是合法身份的证明。',
              iconKey: 'book'
            },
            {
              name: '枷锁',
              description: '鬼卒手中的刑具，象征着对违规者与恶人的强制管束。',
              iconKey: 'chain'
            }
          ]
        }
      },
      {
        title: '黄泉路',
        titleEn: 'Yellow Springs Road',
        content: '又称“阴阳路”，是魂魄去往地府的漫漫长路。路旁开满彼岸花，花叶不相见，寓意生离死别。',
        image: 'https://images.unsplash.com/photo-1518066000714-58c45f1a2c0a?q=80&w=600&auto=format&fit=crop',
        details: {
          bio: '黄泉路，又称阴阳路，是亡魂过了鬼门关后通往阎罗殿的漫长道路。传说路上黄沙漫天，没有日月星辰，只有迷蒙的微光。路两旁盛开着火红的彼岸花（曼珠沙华），花开不见叶，叶生不见花，花叶生生相错，指引着亡魂前行。',
          connection: '孤独之旅：黄泉路象征着死亡旅程中绝对的孤独。在这条路上，亡魂失去了人间的亲友陪伴，只能独自面对未知的审判。彼岸花的凄美传说，为这条死亡之路增添了一抹悲凉的诗意。',
          influence: '终极归宿：“上穷碧落下黄泉”，黄泉已成为中国文化中死亡世界的代称。它代表了生命的终结与不可逆转，引发了无数文人墨客关于生死离别的感叹。',
          symbols: [
            {
              name: '彼岸花',
              description: '血红色的曼珠沙华，象征着无尽的思念与绝望的爱。',
              iconKey: 'wind'
            },
            {
              name: '迷雾',
              description: '笼罩在路上的阴霾，象征着未来的迷茫与不可知。',
              iconKey: 'eye'
            }
          ]
        }
      },
      {
        title: '望乡台',
        titleEn: 'Home Viewing Pavilion',
        content: '亡魂在此最后一次遥望家乡与亲人。台高耸入云，刻有“望乡”二字，寄托了对尘世的无限眷恋。',
        image: 'https://images.unsplash.com/photo-1506259091721-347f798196d4?q=80&w=600&auto=format&fit=crop',
        details: {
          bio: '望乡台位于名山之顶稍下处，相传是亡魂在去往地府深处前，最后一次回头看望阳间家乡与亲人的地方。台高且陡，视野开阔。亡魂站在此处，能看到家乡亲人因失去自己而悲痛欲绝的场景，往往泪如雨下，从此斩断尘缘，死心塌地前往阴曹。',
          connection: '情感割裂：望乡台的设计极具人情味，它承认了人对生之眷恋。但这种“看最后一眼”的仪式，恰恰是为了完成心理上的最终告别。它是从“生人”向“亡鬼”转变的心理临界点。',
          influence: '情感寄托：望乡台不仅是传说中的建筑，更是游子思乡的文化符号。它寄托了中国人浓厚的乡土情结与家庭观念，即便面对死亡，这种牵挂依然无法轻易割舍。',
          symbols: [
            {
              name: '高台',
              description: '耸立于阴阳交界的高处，提供俯瞰尘世的视角。',
              iconKey: 'mountain'
            },
            {
              name: '泪眼',
              description: '亡魂的最后一滴眼泪，凝聚了对人间所有的爱与痛。',
              iconKey: 'eye'
            }
          ]
        }
      },
      {
        title: '天子殿',
        titleEn: 'Tianzi Palace',
        content: '名山最高处的古建筑群，主要供奉阎罗天子，是全山的核心建筑。也是审判亡魂、赏善罚恶的最高权力中心。',
        image: 'https://images.unsplash.com/photo-1542645976-15582b13fae3?q=80&w=600&auto=format&fit=crop',
        details: {
          bio: '天子殿始建于西晋，现存建筑为清康熙年间重建，是丰都名山建筑群的核心与顶峰。殿宇宏伟，飞檐重叠。殿内正中塑有阎罗天子坐像，庄严肃穆，两旁站立六曹判官与四大阴帅。这里是地府的“中南海”，是阎王爷办公、审判亡魂、定夺生死的最高权力场所。',
          connection: '权力中枢：天子殿象征着冥界至高无上的司法权力。如果说前面的关卡是筛选与程序，这里就是最终的判决庭。它完整复刻了人间帝王的宫殿规制，强化了“阴间即官场”的社会心理投射。',
          influence: '因果信仰：作为赏善罚恶的终极象征，天子殿承载了中国人最朴素的正义观——“善有善报，恶有恶报”。千百年来，这种信仰在维持社会道德底线方面发挥了不可替代的作用。',
          symbols: [
            {
              name: '惊堂木',
              description: '阎王拍案，震慑群鬼，象征着审判的威严与决断。',
              iconKey: 'axe'
            },
            {
              name: '判词',
              description: '对于善恶是非的最终定性，一字千金，不可更改。',
              iconKey: 'pen'
            }
          ]
        }
      },
      {
        title: '王母殿',
        titleEn: 'Queen Mother Palace',
        content: '供奉西王母（王母娘娘）。传说她掌管长生不老之药，与名山“道教福地”的长寿文化一脉相承。',
        image: 'https://raw.githubusercontent.com/he-sy23-commits/Project/main/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D4065588999941971063%26skey%3D%40crypt_c64eccd3_3eb71958fa2405b84acb24bf4c76e589%26mmweb_appid%3Dwx_webfilehelper.jpeg',
        details: {
          bio: '王母殿供奉的是道教女神西王母（王母娘娘）。传说西王母掌管不死之药与罚恶刑具。虽然丰都以鬼城闻名，但王母殿的存在提醒着人们这里原本是道教七十二福地之一。殿前通常香火缭绕，信众在此祈求健康、长寿与平安。',
          connection: '生死辩证：在充满死亡气息的鬼城中供奉掌管长生的女神，形成了一种独特的生死辩证。它暗示了死亡并非终结，而是生命转化的环节。王母的仙气与地府的鬼气在此交织，构成了丰都完整的神学光谱。',
          influence: '福寿文化：王母殿的存在保留了丰都作为“仙都”的历史记忆。它满足了人们对延年益寿的渴望，与鬼城的惩罚机制形成互补，体现了中国人追求现世安稳与死后解脱的双重诉求。',
          symbols: [
            {
              name: '蟠桃',
              description: '三千年一开花，三千年一结果，食之长生不老。',
              iconKey: 'fruit'
            },
            {
              name: '不死药',
              description: '传说中西王母掌握的神秘丹药，是超越生死的终极追求。',
              iconKey: 'cup'
            }
          ]
        }
      },
      {
        title: '二仙楼',
        titleEn: 'Tower of Two Immortals',
        content: '纪念在丰都修炼成仙的汉代方士王方平与阴长生。楼阁飞檐翘角，象征着得道飞升的仙家境界。',
        image: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?q=80&w=600&auto=format&fit=crop',
        details: {
          bio: '二仙楼是为了纪念汉代在丰都名山修炼成仙的王方平（王远）与阴长生两位真人而建。楼阁精巧雅致，具有典型的中国传统楼阁式建筑风格。传说二仙在此炼丹修道，最终白日飞升。',
          connection: '名字起源：二仙楼不仅是纪念建筑，更是丰都“鬼城”之名的源头见证。正因后人将“阴、王”二姓讹传为“阴王”（阎王），才有了后世波澜壮阔的鬼城文化。它是连接历史真实与神话传说的关键节点。',
          influence: '修道理想：二仙楼代表了传统知识分子与求道者对超脱尘世、羽化登仙的最高理想。它提醒着游客，丰都不只有恐怖的审判，更有清静无为的仙家气象。',
          symbols: [
            {
              name: '丹炉',
              description: '炼制金丹的器具，象征着修炼过程中的磨砺与升华。',
              iconKey: 'wine'
            },
            {
              name: '白鹤',
              description: '随仙人飞升的灵禽，象征着自由与高洁的灵魂。',
              iconKey: 'bird'
            }
          ]
        }
      },
      {
        title: '双桂山',
        titleEn: 'Shuanggui Mountain',
        content: '与名山隔江相望，又名鹿鸣山。苏轼三父子曾游览并题诗，是国家森林公园，充满人文气息与自然之美。',
        image: 'https://raw.githubusercontent.com/he-sy23-commits/Project/main/000.jpg',
        mediaType: 'image',
        imagePosition: 'object-[50%_50%]',
        details: {
            bio: '双桂山，又名鹿鸣山，海拔401米，与名山遥遥相望。因唐代山中有两棵千年桂树而得名。北宋嘉祐四年（1059年），苏轼父子三人泛舟出川，经停丰都，游览双桂山，留下了《仙都山鹿》等不朽诗篇。此外，周恩来、贺龙等革命先辈也曾在此留下足迹。',
            connection: '阴阳相济：如果说名山代表了“死”与“阴”的鬼神文化，双桂山则代表了“生”与“阳”的人文自然文化。两者隔江对峙，一阴一阳，共同构成了丰都完整的文化生态。',
            influence: '文化胜地：作为国家森林公园，双桂山不仅植被丰富，更保存了苏公祠、恩来亭、护国亭、良缘亭等大量人文景观，是长江三峡沿线重要的名胜古迹。',
            symbols: [
                {
                    name: '青山',
                    description: '双桂山林木苍翠，景色秀丽，是著名的国家森林公园，象征生机与自然。',
                    iconKey: 'mountain'
                },
                {
                    name: '文墨',
                    description: '苏轼父子的诗文墨宝，为秀美的自然山水注入了不朽的文化灵魂。',
                    iconKey: 'book'
                }
            ]
        }
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
        content: '扁鹊（约前 407— 前 310），本名秦越人，渤海郡鄚人，战国名医，被尊为 “医祖”“药王” 之一。',
        image: 'https://raw.githubusercontent.com/he-sy23-commits/Project/main/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D7299479165198763019%26skey%3D%40crypt_c64eccd3_22ca122c60c2ebb47ab22a5864fa691e%26mmweb_appid%3Dwx_webfilehelper.jpeg',
        mediaType: 'image',
        imagePosition: 'object-[50%_25%]',
        details: {
            bio: '扁鹊（约前 407— 前 310），本名秦越人，战国时期著名医学家。少时师从长桑君，尽得禁方秘术。他奠定中医学理，创造性地总结出“望、闻、问、切”四诊法，尤精于脉诊，能“视人五脏症结”，开启了中医学的先河。',
            connection: '幽冥医疗信仰：丰都作为“阴曹地府”象征，其“药王殿”承载生死医疗想象，扁鹊以“神医”身份被纳入幽冥护佑体系，与孙思邈等共同被奉为主治疾病、护佑亡魂的医神。符号融合意义：丰都鬼城通过整合扁鹊等医药神祇，将阳间医疗文化延伸至幽冥叙事，强化“惩恶扬善、救死扶伤”的道德教化功能，成为生死观与医学信仰的交汇点。',
            influence: '殿宇供奉传统：丰都名山设药王殿，虽主祀孙思邈与邳彤，但扁鹊作为“医祖”在民间与道教神系中地位显著，其形象常出现在配祀或地方变体中。民间四月二十八日祭其诞辰，香火绵延千年，满足信众对“死后健康”的祈福需求。',
            symbols: [
              {
                name: '神鸟图腾',
                description: '“扁鹊”本义为一种喜鹊。上古视喜鹊为神鸟，能传达喜讯。他是神医与神鸟的图腾合体，寓意飞翔人间、救苦救难。',
                iconKey: 'bird'
              },
              {
                name: '透视神眼',
                description: '传说因服用“上池之水”，具有透视人体五脏症结的能力。象征医学诊断的极致——洞察力与预判。',
                iconKey: 'eye'
              }
            ]
        }
      },
      {
        title: '黑白无常',
        titleEn: 'Impermanence',
        content: '黑白无常，又称 “无常”，是中国道教神话中的一对神祇，也是民间传说中的勾魂使者。黑白无常分别名为谢必安和范无救，两人是结拜兄弟，也被称为七爷和八爷，在四川，他们则被也称为 “吴二爷”。',
        image: 'https://raw.githubusercontent.com/he-sy23-commits/Project/main/ghost.jpg',
        mediaType: 'image',
        imagePosition: 'object-[50%_20%]',
        details: {
            bio: '谢必安（白无常）身量高瘦，面色惨白，口吐长舌；范无救（黑无常）身量矮胖，面色黝黑。传说二人原为衙门差役，情同手足。一日相约桥下，谢必安归家取伞，范无救守约不离，遇洪水暴涨而不愿失信离去，竟致溺毙。谢必安归来见状，悲痛欲绝，遂吊死于桥柱。上天感其信义，封为冥界神将。',
            connection: '幽冥职能：在丰都鬼城的信仰体系中，黑白无常是连接阴阳的“摆渡人”。他们手执脚镣手铐，专职缉拿阳寿已尽的亡魂，将其押解至鬼门关接受审判。他们既是死亡的象征，也是赏善罚恶的执行者。',
            influence: '民间信仰：民间对其敬畏有加，亦称“谢范将军”。白无常虽相貌可怖但主要对付恶鬼，对善人则示以财运；黑无常则刚正不阿，专门惩治恶人。这种二元对立的形象深深植根于中国民间生死观中。',
            symbols: [
              {
                name: '高帽密语',
                description: '白无常高帽书“一见生财”，寓意对向善之人的护佑；黑无常高帽书“天下太平”，意在荡平世间邪恶。',
                iconKey: 'hat'
              },
              {
                name: '哭丧棒与伞',
                description: '哭丧棒用以震慑恶鬼，纸伞则源于二人“雨伞之约”的感人典故，是信义的象征。',
                iconKey: 'umbrella'
              }
            ]
        }
      },
      {
        title: '崔判官',
        titleEn: 'Judge Cui',
        content: '崔判官本名崔珏（字子玉），是道教与民间信仰中地府首席判官，原型为唐代清官，在丰都鬼城天子殿位列四大判官之首，执掌生死簿与勾魂笔，专司阴阳生死裁决。',
        image: 'https://raw.githubusercontent.com/he-sy23-commits/Project/main/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D3444650223526484849%26skey%3D%40crypt_c64eccd3_22ca122c60c2ebb47ab22a5864fa691e%26mmweb_appid%3Dwx_webfilehelper.jpeg',
        mediaType: 'image',
        imagePosition: 'object-[50%_15%]',
        details: {
            bio: '崔珏（字子玉），唐代祁州（今山西）人，贞观年间为长子县令。相传他为官清正，断案如神，民间有“昼理阳间事，夜断阴府冤”之说。死后化身冥界判官，主管“阴律司”，为地府四大判官之首，专门审查亡魂生前善恶。',
            connection: '司法权威象征：在丰都鬼城的天子殿中，崔判官侍立于阎罗天子左侧，地位崇高。他执掌的阴律司是地府的最高“法院”，象征着不可逾越的法度与正义。其形象将人间对清官的渴望投射至死后世界，强化了鬼城的司法审判叙事。',
            influence: '民间信仰基石：崔府君在民间信仰中极具影响力，被视为公正的化身。旧时百姓遇冤屈难伸，往往寄希望于死后崔判官的公正裁决。这种信仰维系了传统社会的道德底线，警醒世人“举头三尺有神明”。',
            symbols: [
                {
                    name: '生死簿',
                    description: '详载众生生辰八字与阳寿终期，铁面无私，毫厘不爽。',
                    iconKey: 'book'
                },
                {
                    name: '勾魂笔',
                    description: '判官手中的朱笔，勾点之间定人生死，断人轮回，象征权力的终极裁断。',
                    iconKey: 'pen'
                }
            ]
        }
      },
      {
        title: '孟婆',
        titleEn: 'Lady Meng',
        content: '在奈河桥边递送孟婆汤，让人忘却前世记忆，干干净净转世。',
        image: 'https://raw.githubusercontent.com/he-sy23-commits/Project/main/mengpo.jpg',
        mediaType: 'image',
        imagePosition: 'object-[50%_20%]',
        details: {
            bio: '孟婆是中国神话中遗忘的守护者。传说她生于西汉，自小研读儒家经典，后入山修道。她不回忆过去，不思考未来，一心只做让人遗忘的汤。上天命其为幽冥之神，在奈何桥畔筑“醧忘台”，专司亡魂转世前的记忆清洗。',
            connection: '轮回枢纽：在丰都鬼城的信仰版图中，孟婆是连接前世与今生的最后一道关卡。她手中的孟婆汤（又称迷魂汤），是斩断尘缘、重启命运的象征。无论生前王侯将相还是贩夫走卒，在此皆一律平等，必须喝下此汤，赤条条去往来生。',
            influence: '遗忘文化：孟婆的形象深入人心，成为中国文化中“放下执念、重新开始”的代名词。“喝一碗孟婆汤”既是对痛苦记忆的解脱，也是对未知新生的期许。',
            symbols: [
                {
                    name: '孟婆汤',
                    description: '汇集世间悲欢离合熬制而成，分酸甜苦辣咸五味，一饮便忘前尘。',
                    iconKey: 'cup'
                },
                {
                    name: '奈何桥',
                    description: '连接阴阳两界的边界，孟婆在此守候，见证无数灵魂的最后回眸。',
                    iconKey: 'bridge'
                }
            ],
            gallery: [
                {
                    imgUrl: 'https://raw.githubusercontent.com/he-sy23-commits/Project/main/Screenshot%202025-12-29%20at%2001.31.41.png',
                    linkUrl: 'https://www.ltfc.net/view/SUHA/647a05bb1977e748e6a8ec0f?originType=SOURCE_SEARCH',
                    caption: '明 陈洪绶《麻姑献寿图》'
                },
                {
                    imgUrl: 'https://raw.githubusercontent.com/he-sy23-commits/Project/main/Screenshot%202025-12-29%20at%2001.31.35.png',
                    linkUrl: 'https://www.ltfc.net/view/SUHA/647a18b91977e748e6a9b9af?originType=SOURCE_SEARCH',
                    caption: '清代 《麻姑献寿图》'
                }
            ]
        }
      },
      {
        title: '牛头马面',
        titleEn: 'Ox-Head & Horse-Face',
        content: '冥府著名的勾魂使者，一名阿傍（牛头），一名罗刹（马面），专门负责捉拿、押解亡魂。',
        image: 'https://raw.githubusercontent.com/he-sy23-commits/Project/main/2.jpg',
        mediaType: 'image',
        imagePosition: 'object-[50%_50%]',
        details: {
            bio: '牛头又名阿傍，源于佛教《五苦章句经》，力大无穷，手持钢叉；马面又称马头罗刹，源于佛教《楞严经》。二者原为佛教地狱狱卒，传入中国后融入道教及民间信仰，成为地府的“金牌打手”和执法者。',
            connection: '执法象征：在丰都鬼城，牛头马面形象威严恐怖，象征着冥界法律的强制力与不可抗拒。他们与黑白无常不同，黑白无常多负责缉拿，牛头马面多负责镇压与刑罚。',
            influence: '警示作用：其狰狞的形象常被用来警醒世人勿作恶事，否则死后必遭严惩。',
            symbols: [
                {
                    name: '钢叉与斧',
                    description: '冥界执法的暴力工具，象征不可撼动的强制力。',
                    iconKey: 'axe'
                },
                {
                    name: '锁链',
                    description: '束缚罪恶灵魂的刑具，任何恶鬼皆难逃脱。',
                    iconKey: 'chain'
                }
            ]
        }
      },
      {
        title: '哼哈二将',
        titleEn: 'Hengha Generals',
        content: '佛道二教的护法神，郑伦（哼将）鼻哼白气制敌，陈奇（哈将）口吐黄气擒将，镇守山门。',
        image: 'https://raw.githubusercontent.com/he-sy23-commits/Project/main/3.jpg',
        mediaType: 'image',
        imagePosition: 'object-[50%_30%]',
        details: {
            bio: '哼哈二将原型为《封神演义》中的郑伦与陈奇。郑伦曾拜度厄真人为师，鼻中能哼出白气吸人魂魄；陈奇曾受异人传授，口中能吐出黄气散人魂魄。死后被姜子牙封神，负责镇守释迦牟尼佛和道教仙山的门庭。',
            connection: '山门守护：在丰都名山，哼哈二将供奉于半山腰的哼哈祠，作为进入鬼城核心区的第一道屏障。他们怒目圆睁，威慑四方妖邪，保护神域清静。',
            influence: '门神信仰：作为著名的门神形象之一，哼哈二将代表了将一切邪恶拒之门外的守护力量。',
            symbols: [
                {
                    name: '鼻哼白气',
                    description: '郑伦的绝技，白光闪处，吸魂摄魄。',
                    iconKey: 'wind'
                },
                {
                    name: '口吐黄气',
                    description: '陈奇的绝技，黄气喷涌，散魂制敌。',
                    iconKey: 'zap'
                }
            ]
        }
      },
      {
        title: '二仙',
        titleEn: 'Wang & Yin',
        content: '汉代方士王方平与阴长生，在丰都名山修炼成仙。后人将其姓氏讹传为“阴王”，遂有阴曹地府之说。',
        image: 'https://raw.githubusercontent.com/he-sy23-commits/Project/main/5.jpg',
        mediaType: 'image',
        imagePosition: 'object-[50%_40%]',
        details: {
            bio: '王方平（王远）与阴长生均为东汉时期的著名道士。相传王方平官至中散大夫，后弃官入蜀修道；阴长生为汉和帝阴皇后族人，富贵不迷，入山求道。二人在丰都平都山精修多年，最终白日飞升，得道成仙。',
            connection: '鬼城起源：丰都之所以成为“鬼城”，实为一场历史的误读。民众将“阴、王”二仙的姓氏连读为“阴王”（阎王），加上道教福地与鬼神信仰的层层叠加，使得原本的“仙都”逐渐演变成了“鬼都”。',
            influence: '仙道文化：二仙是丰都道教文化的根基，代表了名山作为“洞天福地”的本来面目。',
            symbols: [
                {
                    name: '仙鹤',
                    description: '道教飞升的坐骑，象征超脱尘世、羽化登仙。',
                    iconKey: 'bird'
                },
                {
                    name: '葫芦',
                    description: '悬壶济世，内藏乾坤，是道家修炼与炼丹的标志。',
                    iconKey: 'gourd'
                }
            ]
        }
      },
      {
        title: '麻姑',
        titleEn: 'Magu',
        content: '道教神话中的长寿女神，曾三次见东海变为桑田。在丰都传说中，她献酒祝寿，象征福寿绵长。',
        image: 'https://raw.githubusercontent.com/he-sy23-commits/Project/main/4.jpg',
        mediaType: 'image',
        imagePosition: 'object-[50%_25%]',
        details: {
            bio: '麻姑是中国神话中著名的女仙。据葛洪《神仙传》记载，她貌若少女，实际上已活了无尽岁月，曾自言“接待以来，已见东海三为桑田”。她曾在丰都名山向王母献酒，其酒能益寿延年。',
            connection: '吉祥寓意：在森严阴森的鬼城叙事中，麻姑代表了柔和与希望的一面。她的出现象征着即使在生死流转之地，人们依然向往长寿与美好。',
            influence: '沧海桑田：成语“沧海桑田”即源于麻姑的传说，形容世事巨变。',
            symbols: [
                {
                    name: '寿酒',
                    description: '麻姑特酿，饮之可得长生，寓意福寿安康。',
                    iconKey: 'wine'
                },
                {
                    name: '蟠桃',
                    description: '与长寿紧密相关的神果，常伴麻姑出现。',
                    iconKey: 'fruit'
                }
            ],
            gallery: [
                {
                    imgUrl: 'https://raw.githubusercontent.com/he-sy23-commits/Project/main/Screenshot%202025-12-29%20at%2001.31.41.png',
                    linkUrl: 'https://www.ltfc.net/view/SUHA/647a05bb1977e748e6a8ec0f?originType=SOURCE_SEARCH',
                    caption: '宋 马和之 《麻姑仙像图》'
                },
                {
                    imgUrl: 'https://raw.githubusercontent.com/he-sy23-commits/Project/main/Screenshot%202025-12-29%20at%2001.31.35.png',
                    linkUrl: 'https://www.ltfc.net/view/SUHA/647a18b91977e748e6a9b9af?originType=SOURCE_SEARCH',
                    caption: '宋 何青年 《麻姑仙像》'
                }
            ]
        }
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
  heritage: {
    id: 'heritage',
    label: '传承',
    labelEn: 'HERITAGE',
    coordinates: 'ICH-LIST-2006',
    items: [
      {
        title: '丰都庙会',
        titleEn: 'Fengdu Temple Fair',
        content: '2014年列入第四批国家级非物质文化遗产名录。起源于古代香会，每年农历三月三举行，是以“阴天子娶亲”为主线，集民俗巡游、宗教祭祀、物资交流于一体的大型民俗文化盛会。'
      },
      {
        title: '鬼城传说',
        titleEn: 'Ghost City Legends',
        content: '重庆市级非物质文化遗产。流传千年的民间口头文学，以惩恶扬善、唯善呈和为核心价值观，构建了完整的幽冥世界观与善恶报应体系，是丰都文化的灵魂。'
      },
      {
        title: '瓢画工艺',
        titleEn: 'Gourd Painting',
        content: '丰都独特的传统民间美术形式。艺人利用天然葫芦的形态，结合雕刻与绘画技艺，描绘鬼神脸谱或吉祥图案，寓意辟邪纳福，具有浓郁的地方特色。'
      }
    ]
  },
  gallery: {
    id: 'gallery',
    label: '画廊',
    labelEn: 'GALLERY',
    coordinates: 'COLLECTION: 24',
    items: [
      {
        title: '丰都神韵',
        titleEn: 'Spirit of Fengdu',
        content: '展现了丰都名山的缥缈云雾与神秘气息，笔触苍劲有力。',
        image: 'https://raw.githubusercontent.com/he-sy23-commits/Project/main/Screenshot%202025-12-29%20at%2001.31.41.png',
        mediaType: 'image'
      },
      {
        title: '百鬼夜行',
        titleEn: 'Night Parade of One Hundred Demons',
        content: '传统题材画作，生动描绘了传说中的各类鬼神形象，形态各异，栩栩如生。',
        image: 'https://raw.githubusercontent.com/he-sy23-commits/Project/main/Screenshot%202025-12-29%20at%2001.31.41.png',
        mediaType: 'image'
      },
      {
        title: '幽冥盛世',
        titleEn: 'Prosperity of the Netherworld',
        content: '想象中的地府繁华景象，打破了人们对阴间的阴森刻板印象。',
        image: 'https://raw.githubusercontent.com/he-sy23-commits/Project/main/Screenshot%202025-12-29%20at%2001.31.41.png',
        mediaType: 'image'
      },
      {
        title: '麻姑献寿',
        titleEn: 'Magu Presenting Longevity',
        content: '清代画作，描绘了麻姑献酒祝寿的祥瑞场景，线条流畅，色彩典雅。',
        image: 'https://raw.githubusercontent.com/he-sy23-commits/Project/main/Screenshot%202025-12-29%20at%2001.31.35.png',
        mediaType: 'image'
      },
      {
        title: '五云楼',
        titleEn: 'Five Clouds Tower',
        content: '描绘天界仙境的楼阁界画，展现了古人对得道成仙的想象与追求。',
        image: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?q=80&w=600&auto=format&fit=crop',
        mediaType: 'image'
      },
      {
        title: '幽都秋色',
        titleEn: 'Autumn Colors of Youdu',
        content: '毛逸鸣 (2019)。展现了丰都名山在秋日夕照下的神秘意境，红墙绿瓦与金色的秋叶交相辉映。',
        image: 'https://raw.githubusercontent.com/he-sy23-commits/Project/main/youdushiying.jpeg',
        mediaType: 'image',
        details: {
          bio: '2019年毛逸鸣先生所作。画卷铺陈出丰都鬼城（幽都）在秋日黄昏时分的独特气象。画家运用泼墨与重彩相结合的手法，将名山的亭台楼阁隐没在漫山红叶与缭绕云雾之中。画面细腻而宏大，既保留了传统山水画的意境，又融入了现代审美的光影构图，营造出一种既神秘庄严又绚丽多姿的视觉效果。',
          connection: '生死美学：作品以“秋”为眼，借季节的肃杀折射幽冥的威仪，却又在色彩中注入了温暖的金调，隐喻了生死轮回中“生”的希望与“死”的宁静。它打破了传统对鬼城“阴森恐怖”的刻板印象，展现了其作为道教名山的清幽与壮美。',
          influence: '现代诠释：该作是当代艺术家重新审视和解构丰都传统文化的代表作之一。它不仅记录了名山的自然风光，更从艺术角度升华了“鬼城”的文化内涵，让观者在欣赏美景的同时，对生命与自然的循环产生深层的哲学思考。',
          symbols: [
             {
               name: '红叶',
               description: '象征着生命的燃烧与凋零，同时也寓意着轮回中的绚烂时刻。',
               iconKey: 'wind'
             },
             {
               name: '楼阁',
               description: '隐现于云雾中的古建筑，象征着通往彼岸的神秘通道。',
               iconKey: 'mountain'
             }
          ]
        }
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
        title: '景区门票',
        titleEn: 'Admission Info',
        content: '成人票 ¥90/人（含索道往返），开放时间 08:00 - 17:30。学生及60岁以上老人凭证半价；1.2米以下儿童免票。夜游体验需单独预约。',
        link: 'https://tw.trip.com/travel-guide/attraction/fengdu-county/fengdu-mingshan-scenic-area-92169/'
      }
    ]
  }
};