import { useEffect, useState } from 'react'
import { Head } from '@inertiajs/react'

import banyaPareniePhoto from '../../assets/banya-parenie.jpg'
import leaderTatianaPhoto from '../../assets/leader-tatiana.jpg'
import leaderAlenaMuntyanPhoto from '../../assets/leader-alena-muntiyan-v3.jpg'
import leaderAlenaPhoto from '../../assets/leader-alena-tverezovska.jpg'
import heroBanyaFirePhoto from '../../assets/hero-banya-fire-v2.jpg'
import heroMobilePhoto from '../../assets/hero-mobile-venik.jpg'
import stiavnicaWinterPhoto from '../../assets/tb-stiavnica-winter.jpg'
import moodCandlePhoto from '../../assets/tb-mood-candle.jpg'
import nookWinterPhoto from '../../assets/tb-nook-winter.jpg'
import yurtOutsidePhoto from '../../assets/tb-yurt-outside.jpg'
import horsesPhoto from '../../assets/tb-horses.jpg'
import winterForestPhoto from '../../assets/tb-winter-forest.jpg'
import banyaHerbsPhoto from '../../assets/banya-herbs.jpg'
import yurtWinterPhoto from '../../assets/tb-yurt-winter.jpg'
import roomHunterPhoto from '../../assets/tb-room-hunter.jpg'
import roomGreenPhoto from '../../assets/tb-room-green.jpg'
import livingFireplacePhoto from '../../assets/tb-living-fireplace.jpg'
import kitchenStovePhoto from '../../assets/tb-kitchen-stove.jpg'
import kitchenCupboardPhoto from '../../assets/tb-kitchen-cupboard.jpg'
import diningPhoto from '../../assets/tb-dining.jpg'
import cs from './index.module.css'

// Українська версія сторінки. Російська — у index.tsx; зміни в одній варто переносити в іншу.

const PLACE = 'Farma Terra Belá'

// Вечір п’ятниці й суботи: половина групи в бані, друга половина на кіновечорі
const EVENING_SPLIT =
  'Банний ритуал для половини групи, у другої кіновечір з какао й попкорном'

const SCHEDULE = [
  {
    name: 'Четвер',
    date: '10 грудня, заїзд',
    items: [
      { time: 'з 15:00', what: 'Заїзд, поселення, чай з дороги' },
      { time: '19:00', what: 'Special dinner зі спеціальним меню' },
      { time: 'вечір', what: 'Вечір біля каміна, ранній сон' },
    ],
  },
  {
    name: 'П’ятниця',
    date: '11 грудня',
    items: [
      { time: 'до 10:00', what: 'Неквапливий сніданок' },
      { time: '10:00', what: 'Йога в юрті' },
      { time: 'день', what: 'Вільний час: поспати, почитати, погуляти зимовою Банською Штявницею' },
      { time: '14:00', what: 'Обід' },
      { time: '16:00', what: 'Breathwork (практика дихання)' },
      { time: '17:00', what: EVENING_SPLIT },
      { time: 'після бані', what: 'Вечеря' },
    ],
  },
  {
    name: 'Субота',
    date: '12 грудня',
    items: [
      { time: 'до 10:00', what: 'Неквапливий сніданок' },
      { time: '10:00', what: 'Йога в юрті' },
      { time: 'день', what: 'Вільний час, ліс, прогулянки або нічого' },
      { time: '14:00', what: 'Обід' },
      { time: '16:00', what: 'Breathwork (практика дихання)' },
      { time: '17:00', what: 'Банний ритуал і кіновечір, половини групи міняються місцями' },
      { time: 'після бані', what: 'Вечеря' },
    ],
  },
  {
    name: 'Неділя',
    date: '13 грудня, від’їзд',
    items: [
      { time: 'до 10:00', what: 'Неквапливий сніданок' },
      { time: '10:00', what: 'Йога в юрті' },
      { time: 'удень', what: 'Збори без поспіху й від’їзд' },
    ],
  },
]

// Посилання для кнопки — Telegram
const CONTACT_URL = 'https://t.me/jugofwater'

function CtaButton({ children }: { children: string }) {
  return (
    <a className={cs.contactBtn} href={CONTACT_URL} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

type GalleryPhoto = { src: string; alt: string }

const VENUE_PHOTOS: GalleryPhoto[] = [
  { src: horsesPhoto, alt: 'Коні в загоні біля ферми на тлі лісистих пагорбів' },
  { src: kitchenStovePhoto, alt: 'Кухня ферми з дров’яною піччю' },
  { src: yurtOutsidePhoto, alt: 'Юрта на луці з видом на гори' },
  { src: kitchenCupboardPhoto, alt: 'Сільський буфет і стара швейна машинка' },
]

const YURT_PHOTOS: GalleryPhoto[] = [
  { src: yurtWinterPhoto, alt: 'Вид із юрти на засніжений ліс' },
  { src: winterForestPhoto, alt: 'Засніжені ялини й пагорби в тумані довкола ферми' },
]

const STAY_PHOTOS: GalleryPhoto[] = [
  { src: roomHunterPhoto, alt: 'Спальня в мисливському стилі з дерев’яним узголів’ям' },
  { src: roomGreenPhoto, alt: 'Світла спальня із зеленими стінами й сушеними травами' },
  { src: livingFireplacePhoto, alt: 'Вітальня з глиняною піччю-каміном і лежанкою біля вікна' },
]

type Leader = {
  name: string
  role: string
  bio: string
  photo?: string
}

// Ведучі: двох інших заповнити пізніше (ім’я, роль, опис, фото)
const LEADERS: Leader[] = [
  {
    name: 'Тетяна Іларіонова',
    role: 'Психологиня · пармайстриня',
    photo: leaderTatianaPhoto,
    bio: 'IFS-терапевтка, сертифікована фасилітаторка breathwork. Багато років допомагає жінкам почути своє тіло, зняти напругу й збільшити його енергоємність. Головна по бані. Жодної «сталеварної» пари: лише м’яка баня, ніжне й неквапливе парення, у якому легко розслабитися й довіритися.',
  },
  {
    name: 'Альона Мунтіян',
    role: 'Співорганізаторка ретриту · пармайстриня',
    photo: leaderAlenaMuntyanPhoto,
    bio: 'Мати, дружина й підприємиця у сфері громадського харчування з великим досвідом організації заходів. Знає, як зробити так, щоб тобі було смачно й затишно, а думати ні про що не доводилося: усе продумано заздалегідь, лишається тільки відпочивати. У бані парить уважно, із сенсорною турботою: відчуває, яке тепло, дотик і ритм потрібні саме тобі.',
  },
  {
    name: 'Альона Тверезовська',
    role: 'Інструкторка йоги · нутриціологиня',
    photo: leaderAlenaPhoto,
    bio: 'Інструкторка йоги з 10-річним досвідом, нутриціологиня. Веде м’які ранкові практики, які підійдуть і тим, хто вперше стає на килимок: без гонитви за результатом, з увагою до дихання й відчуттів у тілі. Допомагає вибудувати з їжею дбайливі стосунки — як спосіб турботи про себе, а не набір заборон.',
  },
]

export default function RetreatUk() {
  const [lightbox, setLightbox] = useState<{ photos: GalleryPhoto[]; index: number } | null>(null)

  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') {
        setLightbox((l) => (l ? { ...l, index: (l.index + 1) % l.photos.length } : l))
      }
      if (e.key === 'ArrowLeft') {
        setLightbox((l) => (l ? { ...l, index: (l.index - 1 + l.photos.length) % l.photos.length } : l))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox])

  return (
    <div className={cs.page} lang="uk">
      <Head title="Видих: жіночий ретрит у Банській Штявниці">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Work+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className={cs.grain} aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency={0.85} numOctaves={2} stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* ================= HERO ================= */}
      <section className={cs.hero} id="top">
        <nav className={cs.topNav} aria-label="Розділи сторінки">
          <a href="#program">Про ретрит</a>
          <a href="#schedule">Розклад</a>
          <a href="#venue">Місце</a>
          <a href="#leaders">Ведучі</a>
          <a href="#booking">Умови</a>
          <span className={cs.langSwitch}>
            <a href="/" lang="ru">RU</a>
            <a href="/uk" lang="uk" aria-current="page" className={cs.langActive}>UA</a>
          </span>
        </nav>
        <picture>
          <source media="(max-width: 720px)" srcSet={heroMobilePhoto} />
          <img
            className={`${cs.heroVideo} ${cs.heroImage}`}
            src={heroBanyaFirePhoto}
            alt=""
            aria-hidden="true"
          />
        </picture>
        <div className={`${cs.heroScrim} ${cs.heroScrimFire}`} aria-hidden="true" />
        <div className={cs.heroInner}>
          <h1 className={cs.heroTitle}>Видих</h1>
          <div className={cs.heroSub}>жіночий ретрит</div>
          <div className={cs.heroDates}>
            <span className={cs.heroDatesRange}>10&ndash;13 грудня</span>
            <span className={cs.heroDatesDays}>четвер&nbsp;&ndash;&nbsp;неділя</span>
          </div>
          <div className={cs.heroPlace}>{PLACE},&nbsp;Банська&nbsp;Штявниця</div>
        </div>
        <div className={cs.scrollCue}>
          <span>Гортайте</span>
          <div className={cs.stem} />
        </div>
      </section>

      {/* ================= QUOTE ================= */}
      <section className={cs.quote}>
        <div className={cs.quoteMark}>&ldquo;</div>
        <blockquote>
          <p className={cs.quoteTitle}>
            Чотири дні й&nbsp;три ночі відпочинку для&nbsp;себе, для&nbsp;душі й&nbsp;тіла, коли
            про&nbsp;все подбають замість&nbsp;тебе
          </p>
          <p className={cs.quoteText}>Знадобиться лише одне рішення: приїхати.</p>
        </blockquote>
        <div className={cs.ctaRow}>
          <CtaButton>Хочу на ретрит</CtaButton>
        </div>
      </section>

      {/* ================= PROGRAM ================= */}
      <section className={cs.section} id="program">
        <div className={cs.wrap}>
          <div className={cs.sectionHead}>
            <div className={cs.eyebrow}>Від жінки до&nbsp;жінки</div>
            <h2>Іноді треба просто&nbsp;виспатися</h2>
            <p className={cs.programLede}>
              Іноді для&nbsp;щастя не&nbsp;потрібні трансформація, марафон бажань чи&nbsp;нова
              версія себе. Іноді треба просто виспатися. Поїсти смачної їжі, яку приготувала
              не&nbsp;ти. Піти в&nbsp;ліс, зігрітися в&nbsp;бані. Поговорити з&nbsp;людьми, які
              слухають і&nbsp;не&nbsp;оцінюють. Нічого не&nbsp;робити або&nbsp;робити те, чого
              захотілося просто&nbsp;зараз.
            </p>
            <p className={cs.programLede}>
              «Видих»&nbsp;— про&nbsp;максимальний відпочинок для&nbsp;втомлених жінок. Ми нікуди
              не&nbsp;поспішаємо: це не&nbsp;програма продуктивності, а&nbsp;кілька днів, коли
              піклуються про&nbsp;тебе.
            </p>
          </div>

          <div className={`${cs.programFacts} ${cs.programFactsSix}`}>
            <div className={cs.programFact}>
              <div className={cs.num}>01</div>
              <h3>4&nbsp;дні й&nbsp;3&nbsp;ночі</h3>
              <p>З&nbsp;10 по&nbsp;13&nbsp;грудня, без&nbsp;будильника й&nbsp;поспіху. Час, щоб по-справжньому видихнути й&nbsp;виспатися.</p>
            </div>
            <div className={cs.programFact}>
              <div className={cs.num}>02</div>
              <h3>Банний ритуал</h3>
              <p>Великий ритуал парення з&nbsp;віниками, травами й&nbsp;тибетськими чашами.</p>
            </div>
            <div className={cs.programFact}>
              <div className={cs.num}>03</div>
              <h3>Йога</h3>
              <p>Щоранку о&nbsp;10:00, м’яко й&nbsp;у&nbsp;своєму&nbsp;темпі.</p>
            </div>
            <div className={cs.programFact}>
              <div className={cs.num}>04</div>
              <h3>Breathwork</h3>
              <p>М’яка практика дихання. Допомагає розслабитися й&nbsp;відчути тіло.</p>
            </div>
            <div className={cs.programFact}>
              <div className={cs.num}>05</div>
              <h3>Особистий кухар</h3>
              <p>Усі дні нас годує наш кухар із&nbsp;ресторану Inside.</p>
            </div>
            <div className={cs.programFact}>
              <div className={cs.num}>06</div>
              <h3>Special dinner</h3>
              <p>У&nbsp;четвер увечері особлива вечеря зі&nbsp;спеціальним&nbsp;меню.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PRACTICES / ЩО ЧЕКАЄ ================= */}
      <section className={`${cs.section} ${cs.practicesTone}`} id="practices">
        <div className={cs.wrap}>
          <div className={cs.practicesHead}>
            <div className={cs.sectionHead}>
              <div className={cs.eyebrow}>Що на&nbsp;тебе чекає</div>
              <h2>Нічого не&nbsp;треба заслуговувати</h2>
              <p>
                Тут не&nbsp;потрібні підготовка, досвід йоги чи&nbsp;бажання щось у&nbsp;собі
                змінювати. Можна брати участь у&nbsp;всьому, а&nbsp;можна пропустити
                й&nbsp;залишитися під&nbsp;пледом. Обидва варіанти правильні.
              </p>
            </div>
            <div className={`${cs.practicesPhoto} ${cs.practicesPhotoTall}`}>
              <img src={moodCandlePhoto} alt="Жінка сидить на ліжку в теплому світлі лампи" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= BANYA ================= */}
      <section className={`${cs.section} ${cs.banya}`} id="banya">
        <img
          className={cs.banyaPhoto}
          src={banyaPareniePhoto}
          alt="Тетяна парить гостю березовим віником у бані"
        />
        <div className={cs.banyaScrim} aria-hidden="true" />
        <div className={cs.wrap}>
          <div className={cs.banyaHead}>
            <div className={cs.eyebrow}>Серце ретриту</div>
            <h2>Баня</h2>
            <p className={cs.banyaSub}>
              Ніжне парення, трави, віники й&nbsp;звучання&nbsp;чаш.
            </p>
          </div>

          <div className={cs.ritual}>
            <h3>Великий банний ритуал</h3>
            <p className={cs.ritualLede}>
              Ми віримо, що саме в&nbsp;бані часто стається те, що потрібно. У&nbsp;кожної своє:
              свої почуття, свої думки, своє «зараз». Після парення всередині стає тихіше,
              а&nbsp;в&nbsp;голові ясніше. Баня&nbsp;— чарівний простір, який дає змогу
              докорінно змінити стан на&nbsp;краще всього за&nbsp;кілька&nbsp;годин.
            </p>
            <p>
              У&nbsp;п’ятницю й&nbsp;суботу ввечері група ділиться навпіл. Поки одна половина
              в&nbsp;бані, друга влаштовує кіновечір з&nbsp;какао й&nbsp;попкорном.
              Наступного вечора міняємося. Так у&nbsp;бані не&nbsp;буде тісно,
              і&nbsp;кожна учасниця отримає якісний&nbsp;прогрів.
            </p>
          </div>
        </div>
      </section>

      {/* ================= SCHEDULE ================= */}
      <section className={`${cs.section} ${cs.schedule}`} id="schedule">
        <div className={cs.wrap}>
          <div className={cs.sectionHead}>
            <div className={cs.eyebrow}>Розклад</div>
            <h2>Як минають ці&nbsp;дні</h2>
          </div>

          <div className={`${cs.scheduleDays} ${cs.scheduleDaysFour}`}>
            {SCHEDULE.map((day) => (
              <div className={cs.day} key={day.name}>
                <div className={cs.dayHead}>
                  <span className={cs.dayName}>{day.name}</span>
                  <span className={cs.dayDate}>{day.date}</span>
                </div>
                <div className={cs.dayItems}>
                  {day.items.map((item, i) => (
                    <div className={cs.dayItem} key={i}>
                      <time>{item.time}</time>
                      <div className={cs.what}>{item.what}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className={cs.scheduleNote}>
            Це орієнтовна програма. Усе, крім бані та&nbsp;їжі, за&nbsp;бажанням: якщо хочеться
            проспати йогу,&nbsp;проспи.
          </p>
          <div className={cs.ctaRow}>
            <CtaButton>Хочу на ретрит</CtaButton>
          </div>
        </div>
      </section>

      {/* ================= VENUE / МІСЦЕ ================= */}
      <section className={`${cs.section} ${cs.venue}`} id="venue">
        <div className={cs.wrap}>
          <div className={cs.venueIntro}>
            <div className={cs.venuePhotoMain}>
              <img src={nookWinterPhoto} alt="Стіл зі стільцями біля великого вікна, за вікном зимові гори" />
            </div>
            <div className={cs.venueText}>
              <div className={cs.eyebrow}>Місце</div>
              <h2>{PLACE}</h2>
              <p>
                Ферма розташована в&nbsp;самому серці заповідної області Štiavnické&nbsp;vrchy:
                пасовища, коні, ліс і&nbsp;тиша. Довкола розмічені туристичні стежки: можна погуляти зимовим лісом
                або&nbsp;покататися на&nbsp;санчатах, а&nbsp;вночі небо без&nbsp;міського засвічення
                й&nbsp;величезні&nbsp;зорі.
              </p>
              <p>
                До&nbsp;Банської Штявниці лише 10&nbsp;хвилин автомобілем: старе місто
                зі&nbsp;стильними кав’ярнями, ресторанами й&nbsp;зимовими різдвяними&nbsp;ярмарками.
              </p>
            </div>
          </div>

          <div className={cs.venueGrid}>
            <div className={cs.venueItem}>
              <div className={cs.eyebrow}>Тиша</div>
              <h3>Пасовища й&nbsp;коні</h3>
              <p>
                Довкола будинку загони з&nbsp;кіньми й&nbsp;відкриті пагорби. Ні&nbsp;сусідів,
                ні&nbsp;шуму&nbsp;дороги.
              </p>
            </div>
            <div className={cs.venueItem}>
              <div className={cs.eyebrow}>Природа</div>
              <h3>Štiavnické vrchy</h3>
              <p>
                Засніжений ліс, озера й&nbsp;пагорби. Можна гуляти скільки завгодно
                або&nbsp;дивитися на&nbsp;все це з&nbsp;вікна&nbsp;з&nbsp;чаєм.
              </p>
            </div>
            <div className={cs.venueItem}>
              <div className={cs.eyebrow}>Місто</div>
              <h3>Банська Штявниця поруч</h3>
              <p>
                10&nbsp;хвилин автомобілем до&nbsp;кав’ярень, вуличок і&nbsp;зимових вогнів
                старого&nbsp;міста.
              </p>
            </div>
          </div>

          <div className={`${cs.venueBanner} ${cs.venueGridFour}`}>
            {VENUE_PHOTOS.map((photo, i) => (
              <button
                type="button"
                key={photo.src}
                className={cs.venueBannerItem}
                onClick={() => setLightbox({ photos: VENUE_PHOTOS, index: i })}
                aria-label={`Збільшити: ${photo.alt}`}
              >
                <img src={photo.src} alt={photo.alt} />
              </button>
            ))}
          </div>

          <div className={cs.venueTravel}>
            <div>
              <h3 className={cs.eyebrow}>Адреса</h3>
              <div className={cs.addr}>
                <span className={cs.place}>{PLACE}</span>
                Banská Belá 170, 966 15, okres Banská&nbsp;Štiavnica, Slovensko
              </div>
            </div>
            <div>
              <h3 className={cs.eyebrow}>Як дістатися</h3>
              <p>Ферма за&nbsp;10&nbsp;хвилин автомобілем від&nbsp;центру Банської Штявниці.</p>
              <p>Детально про&nbsp;дорогу розповімо після&nbsp;запису.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ЮРТА ================= */}
      <section className={`${cs.section} ${cs.yurt}`} id="yurt">
        <div className={cs.wrap}>
          <div className={cs.sectionHead}>
            <div className={cs.eyebrow}>Юрта</div>
            <h2>Йога з&nbsp;видом на&nbsp;зимовий&nbsp;ліс</h2>
            <p>
              Щоранку ми займаємося йогою в&nbsp;юрті. Вона монгольська, з&nbsp;ясена,
              з&nbsp;пічкою, дерев’яною підлогою й&nbsp;паперовими ліхтарями під&nbsp;стелею.
              А&nbsp;за&nbsp;великими вікнами засніжені пагорби й&nbsp;ліс.
            </p>
            <p>
              Удень сюди теж можна прийти: полежати на&nbsp;подушках із&nbsp;книжкою
              або&nbsp;просто подивитися, як падає&nbsp;сніг.
            </p>
          </div>
          <div className={cs.yurtPhotos}>
            {YURT_PHOTOS.map((photo, i) => (
              <button
                type="button"
                key={photo.src}
                className={`${cs.yurtPhoto} ${i === 0 ? cs.yurtPhotoMain : ''}`}
                onClick={() => setLightbox({ photos: YURT_PHOTOS, index: i })}
                aria-label={`Збільшити: ${photo.alt}`}
              >
                <img src={photo.src} alt={photo.alt} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ШТЯВНИЦЯ ВЗИМКУ ================= */}
      <section className={cs.section} id="stiavnica">
        <div className={cs.wrap}>
          <div className={cs.foodGrid}>
            <div className={cs.foodPhoto}>
              <img src={stiavnicaWinterPhoto} alt="Засніжена Банська Штявниця й Кальварія на пагорбі" />
            </div>
            <div className={cs.sectionHead}>
              <div className={cs.eyebrow}>Взимку</div>
              <h2>Банська Штявниця під&nbsp;снігом</h2>
              <p>
                Одне з&nbsp;найгарніших міст Словаччини, старовинне місто
                срібних копалень зі&nbsp;списку ЮНЕСКО. Будинки з&nbsp;черепичними дахами сходинками спускаються схилами
                давнього вулкана, а&nbsp;над&nbsp;ними на&nbsp;пагорбі стоїть
                біла&nbsp;Кальварія.
              </p>
              <p>
                Узимку місто стає зовсім казковим: сніг на&nbsp;дахах, тепле світло у&nbsp;вікнах
                кав’ярень, гарячий шоколад і&nbsp;неспішні прогулянки вузькими&nbsp;вуличками.
                Поїхати туди можна у&nbsp;вільний час, а&nbsp;можна залишитися на&nbsp;фермі
                й&nbsp;дивитися на&nbsp;засніжений&nbsp;ліс.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STAY / ПРОЖИВАННЯ ================= */}
      <section className={`${cs.section} ${cs.stay}`} id="stay">
        <div className={cs.wrap}>
          <div className={cs.sectionHead}>
            <div className={cs.eyebrow}>Проживання</div>
            <h2>Дім, де стіни пахнуть&nbsp;травами</h2>
            <p>
              Ми займемо головний будинок ферми {PLACE}. У&nbsp;ньому п’ять окремих спалень,
              і&nbsp;кожна оформлена по-своєму: трав’яна спальня, спальня мисливця, фермерська
              спальня, «коняча» спальня і&nbsp;спальня в&nbsp;стилі&nbsp;бохо.
            </p>
            <p>
              Стіни в&nbsp;усіх спальнях укриті глиняною штукатуркою, змішаною з&nbsp;травами,
              а&nbsp;інтер’єри натхненні природою&nbsp;довкола.
            </p>
          </div>

          <div className={`${cs.stayGallery} ${cs.stayGallerySix}`}>
            {STAY_PHOTOS.map((photo, i) => (
              <button
                type="button"
                key={photo.src}
                className={cs.stayGalleryItem}
                onClick={() => setLightbox({ photos: STAY_PHOTOS, index: i })}
                aria-label={`Збільшити: ${photo.alt}`}
              >
                <img src={photo.src} alt={photo.alt} />
              </button>
            ))}
          </div>

          <div className={cs.stayFactsTitle}>Що є в&nbsp;будинку</div>
          <div className={cs.stayFacts}>
            <div className={cs.stayFact}>
              <h3>П’ять спалень</h3>
              <p>Кожна у&nbsp;своєму стилі, з&nbsp;глиняними стінами й&nbsp;деревом.</p>
            </div>
            <div className={cs.stayFact}>
              <h3>Вітальня з&nbsp;каміном</h3>
              <p>
                Справжній камін, шкури, пледи й&nbsp;панорамний вид на&nbsp;загони з&nbsp;кіньми.
              </p>
            </div>
            <div className={cs.stayFact}>
              <h3>Три ванні кімнати</h3>
              <p>Просторі душові з&nbsp;водою з&nbsp;власного&nbsp;джерела.</p>
            </div>
            <div className={cs.stayFact}>
              <h3>Кухня та&nbsp;їдальня</h3>
              <p>Великий спільний стіл, за&nbsp;яким ми збиратимемося&nbsp;разом.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOD / ХАРЧУВАННЯ ================= */}
      <section className={cs.section} id="food">
        <div className={cs.wrap}>
          <div className={cs.foodGrid}>
            <div>
              <div className={cs.sectionHead}>
                <div className={cs.eyebrow}>Харчування</div>
                <h2>Їжа, яку приготували для&nbsp;тебе</h2>
                <p>
                  Усі дні для&nbsp;нас готує наш власний кухар із&nbsp;ресторану Inside. Тобі
                  залишається тільки сісти за&nbsp;стіл.
                </p>
                <p>
                  Ретрит почнеться зі&nbsp;special dinner: у&nbsp;четвер увечері на&nbsp;нас чекає
                  вечеря зі&nbsp;спеціальним меню, заради якої не&nbsp;треба ні&nbsp;готувати,
                  ні&nbsp;мити&nbsp;посуд.
                </p>
              </div>
            </div>
            <div className={cs.foodPhoto}>
              <img src={diningPhoto} alt="Накритий стіл в їдальні ферми" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= LEADERS ================= */}
      <section className={`${cs.section} ${cs.leadersTone}`} id="leaders">
        <div className={cs.wrap}>
          <div className={cs.sectionHead}>
            <div className={cs.eyebrow}>Ведучі</div>
            <h2>Хто про&nbsp;тебе подбає</h2>
          </div>

          <div className={`${cs.leadersGrid} ${cs.leadersGridThree}`}>
            {LEADERS.map((leader, i) => (
              <div key={i}>
                <div className={cs.leaderPhoto}>
                  {leader.photo ? (
                    <img src={leader.photo} alt={leader.name} />
                  ) : (
                    <span className={cs.mono} aria-hidden="true">
                      {i + 1}
                    </span>
                  )}
                </div>
                <h3 className={cs.leaderName}>{leader.name}</h3>
                <div className={cs.leaderRole}>{leader.role}</div>
                {leader.bio ? (
                  <p className={cs.leaderBio}>{leader.bio}</p>
                ) : (
                  <p className={`${cs.leaderBio} ${cs.draft}`}>Опис з’явиться зовсім&nbsp;скоро.</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CLOSING QUOTE ================= */}
      <section className={`${cs.quote} ${cs.quotePhoto}`}>
        <img className={cs.quotePhotoBg} src={banyaHerbsPhoto} alt="" aria-hidden="true" />
        <div className={cs.quotePhotoScrim} aria-hidden="true" />
        <div className={cs.quoteMark}>&ldquo;</div>
        <blockquote>
          <p className={cs.quoteTitle}>Зміни починаються з&nbsp;відпочинку</p>
          <p className={cs.quoteText}>
            Щоб якісно щось змінити в&nbsp;житті, спершу треба якісно відпочити: виспатися,
            зігрітися, відновити сили. Тоді й&nbsp;рішення приходять самі, і&nbsp;на&nbsp;них
            вистачає енергії. Можливо, ти просто давно не&nbsp;відпочивала&nbsp;по-справжньому.
          </p>
        </blockquote>
      </section>

      {/* ================= BOOKING / УМОВИ ================= */}
      <section className={`${cs.section} ${cs.booking}`} id="booking">
        <div className={cs.wrap}>
          <div className={cs.sectionHead}>
            <div className={cs.eyebrow}>Умови</div>
            <h2>Умови участі</h2>
          </div>

          <div className={cs.bookingFacts}>
            <div className={cs.bookingFact}>
              <div className={cs.eyebrow}>Вартість участі</div>
              <h3 className={cs.bookingPrice}>650&nbsp;€</h3>
              <p>10&ndash;13 грудня, 4&nbsp;дні й&nbsp;3&nbsp;ночі на&nbsp;{PLACE}.</p>
            </div>
            <div className={cs.bookingFact}>
              <div className={cs.eyebrow}>Early bird</div>
              <h3 className={cs.bookingPrice}>590&nbsp;€</h3>
              <p>У&nbsp;разі оплати до&nbsp;5&nbsp;листопада.</p>
            </div>
            <div className={cs.bookingFact}>
              <div className={cs.eyebrow}>Бронювання</div>
              <h3>Застава 300&nbsp;€</h3>
              <p>
                Щоб забронювати місце, треба внести заставу. Скасування можливе
                не&nbsp;пізніше ніж за&nbsp;два тижні до&nbsp;ретриту, тобто до&nbsp;26&nbsp;листопада.
              </p>
            </div>
          </div>
          <div className={cs.bookingIncludes}>
            <h3>У&nbsp;вартість&nbsp;входить</h3>
            <ul>
              <li>3&nbsp;ночі проживання на&nbsp;{PLACE}</li>
              <li>Харчування від&nbsp;нашого кухаря та&nbsp;special&nbsp;dinner</li>
              <li>Великий банний&nbsp;ритуал</li>
              <li>Йога&nbsp;щоранку</li>
              <li>Breathwork (практика дихання)</li>
              <li>Кіновечір з&nbsp;какао й&nbsp;попкорном</li>
            </ul>
            <p className={cs.bookingExcluded}>Не&nbsp;входить: дорога до&nbsp;місця&nbsp;проведення.</p>
          </div>
          <CtaButton>Хочу на ретрит</CtaButton>
        </div>
      </section>

      <footer className={cs.footer}>
        <div className={cs.footLogo}>видих</div>
        <div className={cs.footDates}>10&ndash;13 грудня&nbsp;· четвер&ndash;неділя</div>
        <div className={cs.footPlace}>{PLACE},&nbsp;Банська&nbsp;Штявниця</div>
      </footer>

      {lightbox !== null && (
        <div
          className={cs.lightbox}
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.photos[lightbox.index].alt}
        >
          <button
            type="button"
            className={cs.lightboxClose}
            onClick={() => setLightbox(null)}
            aria-label="Закрити"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M2 2L18 18M18 2L2 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>

          <button
            type="button"
            className={`${cs.lightboxArrow} ${cs.lightboxArrowPrev}`}
            onClick={(e) => {
              e.stopPropagation()
              setLightbox((l) => (l ? { ...l, index: (l.index - 1 + l.photos.length) % l.photos.length } : l))
            }}
            aria-label="Попереднє фото"
          >
            <svg width="16" height="26" viewBox="0 0 16 26" fill="none">
              <path d="M14 2L3 13L14 24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            className={`${cs.lightboxArrow} ${cs.lightboxArrowNext}`}
            onClick={(e) => {
              e.stopPropagation()
              setLightbox((l) => (l ? { ...l, index: (l.index + 1) % l.photos.length } : l))
            }}
            aria-label="Наступне фото"
          >
            <svg width="16" height="26" viewBox="0 0 16 26" fill="none">
              <path d="M2 2L13 13L2 24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <img
            className={cs.lightboxImg}
            src={lightbox.photos[lightbox.index].src}
            alt={lightbox.photos[lightbox.index].alt}
            onClick={(e) => e.stopPropagation()}
          />
          <div className={cs.lightboxCount}>
            {lightbox.index + 1} / {lightbox.photos.length}
          </div>
        </div>
      )}
    </div>
  )
}
