import { useEffect, useState } from 'react'
import { Head } from '@inertiajs/react'

import banyaPareniePhoto from '../../assets/banya-parenie.jpg'
import leaderTatianaPhoto from '../../assets/leader-tatiana.jpg'
import leaderAlenaMuntyanPhoto from '../../assets/leader-alena-muntiyan-v3.jpg'
import leaderAlenaPhoto from '../../assets/leader-alena-tverezovska.jpg'
import heroBanyaFirePhoto from '../../assets/hero-banya-fire-v2.jpg'
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

const PLACE = 'Farma Terra Belá'

// Вечер пятницы и субботы: половина группы в бане, вторая половина на кино-вечере
const EVENING_SPLIT =
  'Банный ритуал для половины группы, у второй кино-вечер с какао и попкорном'

const SCHEDULE = [
  {
    name: 'Четверг',
    date: '10 декабря, заезд',
    items: [
      { time: 'с 15:00', what: 'Заезд, размещение, чай с дороги' },
      { time: '19:00', what: 'Special dinner со специальным меню' },
      { time: 'вечер', what: 'Вечер у камина, ранний сон' },
    ],
  },
  {
    name: 'Пятница',
    date: '11 декабря',
    items: [
      { time: 'до 10:00', what: 'Неспешный завтрак' },
      { time: '10:00', what: 'Йога в юрте' },
      { time: 'день', what: 'Свободное время: поспать, почитать, погулять по зимней Банской Штявнице' },
      { time: '14:00', what: 'Обед' },
      { time: '16:00', what: 'Breathwork (практика дыхания)' },
      { time: '17:00', what: EVENING_SPLIT },
      { time: 'после бани', what: 'Ужин' },
    ],
  },
  {
    name: 'Суббота',
    date: '12 декабря',
    items: [
      { time: 'до 10:00', what: 'Неспешный завтрак' },
      { time: '10:00', what: 'Йога в юрте' },
      { time: 'день', what: 'Свободное время, лес, прогулки или ничего' },
      { time: '14:00', what: 'Обед' },
      { time: '16:00', what: 'Breathwork (практика дыхания)' },
      { time: '17:00', what: 'Банный ритуал и кино-вечер, половины группы меняются местами' },
      { time: 'после бани', what: 'Ужин' },
    ],
  },
  {
    name: 'Воскресенье',
    date: '13 декабря, отъезд',
    items: [
      { time: 'до 10:00', what: 'Неспешный завтрак' },
      { time: '10:00', what: 'Йога в юрте' },
      { time: 'днём', what: 'Сборы без спешки и отъезд' },
    ],
  },
]

// Ссылка для кнопки «Связаться с нами» — Telegram
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
  { src: horsesPhoto, alt: 'Лошади в загоне у фермы на фоне лесистых холмов' },
  { src: kitchenStovePhoto, alt: 'Кухня фермы с дровяной печью' },
  { src: yurtOutsidePhoto, alt: 'Юрта на лугу с видом на горы' },
  { src: kitchenCupboardPhoto, alt: 'Деревенский буфет и старая швейная машинка' },
]

const YURT_PHOTOS: GalleryPhoto[] = [
  { src: yurtWinterPhoto, alt: 'Вид из юрты на заснеженный лес' },
  { src: winterForestPhoto, alt: 'Заснеженные ели и холмы в тумане вокруг фермы' },
]

const STAY_PHOTOS: GalleryPhoto[] = [
  { src: roomHunterPhoto, alt: 'Спальня в охотничьем стиле с деревянным изголовьем' },
  { src: roomGreenPhoto, alt: 'Светлая спальня с зелёными стенами и сушёными травами' },
  { src: livingFireplacePhoto, alt: 'Гостиная с глиняной печью-камином и лежанкой у окна' },
]

type Leader = {
  name: string
  role: string
  bio: string
  photo?: string
}

// Ведущие: двух оставшихся заполнить позже (имя, роль, описание, фото)
const LEADERS: Leader[] = [
  {
    name: 'Татьяна Илларионова',
    role: 'Психолог · пармастерица',
    photo: leaderTatianaPhoto,
    bio: 'IFS-терапевт, сертифицированный фасилитатор breathwork. Много лет помогает женщинам услышать своё тело, снять напряжение и увеличить его энергоёмкость. Главная по бане. Никакого «сталеварного» пара: только мягкая баня, нежное и неторопливое парение, в котором легко расслабиться и довериться.',
  },
  {
    name: 'Алёна Мунтиян',
    role: 'Со-организатор ретрита · пармастерица',
    photo: leaderAlenaMuntyanPhoto,
    bio: 'Мать, жена и предприниматель в сфере общепита с большим опытом организации мероприятий. Знает, как сделать так, чтобы тебе было вкусно и уютно, а думать ни о чём не приходилось: всё продумано заранее, остаётся только отдыхать. В бане парит внимательно, с сенсорной заботой: чувствует, какое тепло, прикосновение и ритм нужны именно тебе.',
  },
  {
    name: 'Алёна Тверезовская',
    role: 'Инструктор йоги · нутрициолог',
    photo: leaderAlenaPhoto,
    bio: 'Инструктор йоги с 10-летним опытом, нутрициолог. Ведёт мягкие утренние практики, которые подойдут и тем, кто впервые встаёт на коврик: без гонки за результатом, с вниманием к дыханию и ощущениям в теле. Помогает выстроить с едой бережные отношения — как способ заботы о себе, а не набор запретов.',
  },
]

export default function RetreatIndex() {
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
    <div className={cs.page} lang="ru">
      <Head title="Выдох: женский ретрит в Банской Штявнице">
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
        <nav className={cs.topNav} aria-label="Разделы страницы">
          <a href="#program">О ретрите</a>
          <a href="#schedule">Расписание</a>
          <a href="#venue">Место</a>
          <a href="#leaders">Ведущие</a>
          <a href="#booking">Условия</a>
          <span className={cs.langSwitch}>
            <a href="/" lang="ru" aria-current="page" className={cs.langActive}>RU</a>
            <a href="/uk" lang="uk">UA</a>
          </span>
        </nav>
        <img
          className={`${cs.heroVideo} ${cs.heroImage}`}
          src={heroBanyaFirePhoto}
          alt=""
          aria-hidden="true"
        />
        <div className={`${cs.heroScrim} ${cs.heroScrimFire}`} aria-hidden="true" />
        <div className={cs.heroInner}>
          <h1 className={cs.heroTitle}>Выдох</h1>
          <div className={cs.heroSub}>женский ретрит</div>
          <div className={cs.heroDates}>
            <span className={cs.heroDatesRange}>10&ndash;13 декабря</span>
            <span className={cs.heroDatesDays}>четверг&nbsp;&ndash;&nbsp;воскресенье</span>
          </div>
          <div className={cs.heroPlace}>{PLACE},&nbsp;Банская&nbsp;Штявница</div>
        </div>
        <div className={cs.scrollCue}>
          <span>Листайте</span>
          <div className={cs.stem} />
        </div>
      </section>

      {/* ================= QUOTE ================= */}
      <section className={cs.quote}>
        <div className={cs.quoteMark}>&ldquo;</div>
        <blockquote>
          <p className={cs.quoteTitle}>
            Четыре дня и&nbsp;три ночи отдыха для&nbsp;себя, для&nbsp;души и&nbsp;тела, когда
            обо&nbsp;всём позаботятся за&nbsp;тебя
          </p>
          <p className={cs.quoteText}>Решение понадобится одно: приехать.</p>
        </blockquote>
        <div className={cs.ctaRow}>
          <CtaButton>Хочу на ретрит</CtaButton>
        </div>
      </section>

      {/* ================= PROGRAM ================= */}
      <section className={cs.section} id="program">
        <div className={cs.wrap}>
          <div className={cs.sectionHead}>
            <div className={cs.eyebrow}>От женщины к&nbsp;женщине</div>
            <h2>Иногда нужно просто&nbsp;выспаться</h2>
            <p className={cs.programLede}>
              Иногда для&nbsp;счастья не&nbsp;нужны трансформация, марафон желаний или&nbsp;новая
              версия себя. Иногда нужно выспаться. Поесть вкусной еды, которую приготовила
              не&nbsp;ты. Сходить в&nbsp;лес, отогреться в&nbsp;бане. Поговорить с&nbsp;людьми,
              которые слушают и&nbsp;не&nbsp;оценивают. Ничего не&nbsp;делать или&nbsp;делать то,
              что захотелось прямо&nbsp;сейчас.
            </p>
            <p className={cs.programLede}>
              «Выдох» про&nbsp;максимальный отдых для&nbsp;уставших женщин. Мы никуда
              не&nbsp;спешим: это не&nbsp;программа продуктивности, а&nbsp;несколько дней, когда
              заботятся о&nbsp;тебе.
            </p>
          </div>

          <div className={`${cs.programFacts} ${cs.programFactsSix}`}>
            <div className={cs.programFact}>
              <div className={cs.num}>01</div>
              <h3>4 дня и 3 ночи</h3>
              <p>С 10 по 13 декабря, без будильника и спешки. Время, чтобы по-настоящему выдохнуть и выспаться.</p>
            </div>
            <div className={cs.programFact}>
              <div className={cs.num}>02</div>
              <h3>Банный ритуал</h3>
              <p>Большой ритуал парения с вениками, травами и саундхилингом.</p>
            </div>
            <div className={cs.programFact}>
              <div className={cs.num}>03</div>
              <h3>Йога</h3>
              <p>Каждое утро в 10:00, мягко и в своём темпе.</p>
            </div>
            <div className={cs.programFact}>
              <div className={cs.num}>04</div>
              <h3>Breathwork</h3>
              <p>Мягкая практика дыхания. Помогает расслабиться и почувствовать тело.</p>
            </div>
            <div className={cs.programFact}>
              <div className={cs.num}>05</div>
              <h3>Личный повар</h3>
              <p>Все дни нас кормит наш повар из ресторана Inside.</p>
            </div>
            <div className={cs.programFact}>
              <div className={cs.num}>06</div>
              <h3>Special dinner</h3>
              <p>В четверг вечером особый ужин со специальным меню.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PRACTICES / ЧТО ЖДЁТ ================= */}
      <section className={`${cs.section} ${cs.practicesTone}`} id="practices">
        <div className={cs.wrap}>
          <div className={cs.practicesHead}>
            <div className={cs.sectionHead}>
              <div className={cs.eyebrow}>Что тебя ждёт</div>
              <h2>Ничего не&nbsp;нужно заслуживать</h2>
              <p>
                Здесь не&nbsp;нужна подготовка, опыт йоги или&nbsp;желание что-то в&nbsp;себе
                менять. Можно участвовать во&nbsp;всём, а&nbsp;можно пропустить и&nbsp;остаться
                под&nbsp;пледом. Оба варианта правильные.
              </p>
            </div>
            <div className={`${cs.practicesPhoto} ${cs.practicesPhotoTall}`}>
              <img src={moodCandlePhoto} alt="Женщина сидит на кровати в тёплом свете лампы" />
            </div>
          </div>

        </div>
      </section>

      {/* ================= BANYA ================= */}
      <section className={`${cs.section} ${cs.banya}`} id="banya">
        <img
          className={cs.banyaPhoto}
          src={banyaPareniePhoto}
          alt="Татьяна парит гостью берёзовым веником в бане"
        />
        <div className={cs.banyaScrim} aria-hidden="true" />
        <div className={cs.wrap}>
          <div className={cs.banyaHead}>
            <div className={cs.eyebrow}>Сердце ретрита</div>
            <h2>Баня</h2>
            <p className={cs.banyaSub}>
              Нежное парение, травы, веники и&nbsp;звучание&nbsp;чаш.
            </p>
          </div>

          <div className={cs.ritual}>
            <h3>Большой банный ритуал</h3>
            <p className={cs.ritualLede}>
              Мы верим, что именно в&nbsp;бане часто происходит то, что нужно. У&nbsp;каждой
              своё: свои чувства, свои мысли, своё «сейчас». После парения внутри становится
              тише, а&nbsp;в&nbsp;голове яснее. Баня&nbsp;— волшебное пространство, которое
              позволяет кардинально изменить состояние к&nbsp;лучшему всего за&nbsp;несколько&nbsp;часов.
            </p>
            <p>
              В&nbsp;пятницу и&nbsp;субботу вечером группа делится пополам. Пока одна половина
              в&nbsp;бане, вторая устраивает кино-вечер с&nbsp;какао и&nbsp;попкорном.
              На&nbsp;следующий вечер меняемся. Так в&nbsp;бане не&nbsp;будет тесно,
              и&nbsp;каждая участница получит качественный&nbsp;прогрев.
            </p>
          </div>
        </div>
      </section>

      {/* ================= SCHEDULE ================= */}
      <section className={`${cs.section} ${cs.schedule}`} id="schedule">
        <div className={cs.wrap}>
          <div className={cs.sectionHead}>
            <div className={cs.eyebrow}>Расписание</div>
            <h2>Как проходят эти&nbsp;дни</h2>
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
            Это ориентировочная программа. Всё, кроме бани и&nbsp;еды, по&nbsp;желанию: если
            хочется проспать йогу,&nbsp;проспи.
          </p>
          <div className={cs.ctaRow}>
            <CtaButton>Хочу на ретрит</CtaButton>
          </div>
        </div>
      </section>

      {/* ================= VENUE / МЕСТО ================= */}
      <section className={`${cs.section} ${cs.venue}`} id="venue">
        <div className={cs.wrap}>
          <div className={cs.venueIntro}>
            <div className={cs.venuePhotoMain}>
              <img src={nookWinterPhoto} alt="Стол со стульями у большого окна, за окном зимние горы" />
            </div>
            <div className={cs.venueText}>
              <div className={cs.eyebrow}>Место</div>
              <h2>{PLACE}</h2>
              <p>
                Ферма стоит в&nbsp;самом сердце заповедной области Štiavnické&nbsp;vrchy: пастбища,
                лошади, лес и&nbsp;тишина. Вокруг размеченные туристические тропы: можно погулять по&nbsp;зимнему лесу
                или&nbsp;покататься на&nbsp;санках, а&nbsp;ночью небо без&nbsp;городской засветки
                и&nbsp;огромные&nbsp;звёзды.
              </p>
              <p>
                До&nbsp;Банской Штявницы всего 10&nbsp;минут на&nbsp;машине: старый город
                со&nbsp;стильными кафе, ресторанами и&nbsp;зимними рождественскими&nbsp;ярмарками.
              </p>
            </div>
          </div>

          <div className={cs.venueGrid}>
            <div className={cs.venueItem}>
              <div className={cs.eyebrow}>Тишина</div>
              <h3>Пастбища и&nbsp;лошади</h3>
              <p>
                Вокруг дома загоны с&nbsp;лошадьми и&nbsp;открытые холмы. Ни&nbsp;соседей,
                ни&nbsp;шума&nbsp;дороги.
              </p>
            </div>
            <div className={cs.venueItem}>
              <div className={cs.eyebrow}>Природа</div>
              <h3>Штявницкие горы</h3>
              <p>
                Заснеженный лес, озёра и&nbsp;холмы. Можно гулять сколько хочется
                или&nbsp;смотреть на&nbsp;всё это из&nbsp;окна&nbsp;с&nbsp;чаем.
              </p>
            </div>
            <div className={cs.venueItem}>
              <div className={cs.eyebrow}>Город</div>
              <h3>Банская Штявница рядом</h3>
              <p>
                10&nbsp;минут на&nbsp;машине до&nbsp;кафе, улочек и&nbsp;зимних огней
                старого&nbsp;города.
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
                aria-label={`Увеличить: ${photo.alt}`}
              >
                <img src={photo.src} alt={photo.alt} />
              </button>
            ))}
          </div>

          <div className={cs.venueTravel}>
            <div>
              <h3 className={cs.eyebrow}>Адрес</h3>
              <div className={cs.addr}>
                <span className={cs.place}>{PLACE}</span>
                Banská Belá 170, 966 15, okres Banská&nbsp;Štiavnica, Slovensko
              </div>
            </div>
            <div>
              <h3 className={cs.eyebrow}>Как добраться</h3>
              <p>Ферма в&nbsp;10&nbsp;минутах на&nbsp;машине от&nbsp;центра Банской Штявницы.</p>
              <p>Подробно про&nbsp;дорогу расскажем после&nbsp;записи.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ЮРТА ================= */}
      <section className={`${cs.section} ${cs.yurt}`} id="yurt">
        <div className={cs.wrap}>
          <div className={cs.sectionHead}>
            <div className={cs.eyebrow}>Юрта</div>
            <h2>Йога с&nbsp;видом на&nbsp;зимний&nbsp;лес</h2>
            <p>
              Каждое утро мы занимаемся йогой в&nbsp;юрте. Она монгольская, из&nbsp;ясеня,
              с&nbsp;печкой, деревянным полом и&nbsp;бумажными фонарями под&nbsp;потолком.
              А&nbsp;за&nbsp;большими окнами заснеженные холмы и&nbsp;лес.
            </p>
            <p>
              Днём сюда тоже можно прийти: полежать на&nbsp;подушках с&nbsp;книгой или&nbsp;просто
              посмотреть, как идёт&nbsp;снег.
            </p>
          </div>
          <div className={cs.yurtPhotos}>
            {YURT_PHOTOS.map((photo, i) => (
              <button
                type="button"
                key={photo.src}
                className={`${cs.yurtPhoto} ${i === 0 ? cs.yurtPhotoMain : ''}`}
                onClick={() => setLightbox({ photos: YURT_PHOTOS, index: i })}
                aria-label={`Увеличить: ${photo.alt}`}
              >
                <img src={photo.src} alt={photo.alt} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ŠTIAVNICA ЗИМОЙ ================= */}
      <section className={cs.section} id="stiavnica">
        <div className={cs.wrap}>
          <div className={cs.foodGrid}>
            <div className={cs.foodPhoto}>
              <img
                src={stiavnicaWinterPhoto}
                alt="Заснеженная Банская Штявница и Кальвария на холме"
              />
            </div>
            <div className={cs.sectionHead}>
              <div className={cs.eyebrow}>Зимой</div>
              <h2>Банская Штявница под&nbsp;снегом</h2>
              <p>
                Один из&nbsp;самых красивых городов Словакии, старинный горняцкий город
                из&nbsp;списка ЮНЕСКО. Дома с&nbsp;черепичными крышами лестницей спускаются
                по&nbsp;склонам древнего вулкана, а&nbsp;над&nbsp;ними на&nbsp;холме стоит
                белая&nbsp;Кальвария.
              </p>
              <p>
                Зимой город становится совсем сказочным: снег на&nbsp;крышах, тёплый свет
                в&nbsp;окнах кафе, горячий шоколад и&nbsp;медленные прогулки по&nbsp;узким&nbsp;улочкам.
                Съездить туда можно в&nbsp;свободное время, а&nbsp;можно остаться на&nbsp;ферме
                и&nbsp;смотреть на&nbsp;заснеженный&nbsp;лес.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STAY / ПРОЖИВАНИЕ ================= */}
      <section className={`${cs.section} ${cs.stay}`} id="stay">
        <div className={cs.wrap}>
          <div className={cs.sectionHead}>
            <div className={cs.eyebrow}>Проживание</div>
            <h2>Дом, где стены пахнут&nbsp;травами</h2>
            <p>
              Мы займём главный дом фермы {PLACE}. В&nbsp;нём пять отдельных спален, и&nbsp;каждая
              оформлена по-своему: травяная спальня, спальня охотника, фермерская
              спальня, «лошадиная» спальня и&nbsp;спальня в&nbsp;стиле&nbsp;бохо.
            </p>
            <p>
              Стены во&nbsp;всех спальнях покрыты глиняной штукатуркой, смешанной с&nbsp;травами,
              а&nbsp;интерьеры вдохновлены природой&nbsp;вокруг.
            </p>
          </div>

          <div className={`${cs.stayGallery} ${cs.stayGallerySix}`}>
            {STAY_PHOTOS.map((photo, i) => (
              <button
                type="button"
                key={photo.src}
                className={cs.stayGalleryItem}
                onClick={() => setLightbox({ photos: STAY_PHOTOS, index: i })}
                aria-label={`Увеличить: ${photo.alt}`}
              >
                <img src={photo.src} alt={photo.alt} />
              </button>
            ))}
          </div>

          <div className={cs.stayFactsTitle}>Что есть в&nbsp;доме</div>
          <div className={cs.stayFacts}>
            <div className={cs.stayFact}>
              <h3>Пять спален</h3>
              <p>Каждая в&nbsp;своём стиле, с&nbsp;глиняными стенами и&nbsp;деревом.</p>
            </div>
            <div className={cs.stayFact}>
              <h3>Гостиная с&nbsp;камином</h3>
              <p>
                Настоящий камин, шкуры, пледы и&nbsp;панорамный вид на&nbsp;загоны с&nbsp;лошадьми.
              </p>
            </div>
            <div className={cs.stayFact}>
              <h3>Три ванные комнаты</h3>
              <p>Просторные душевые с&nbsp;водой из&nbsp;собственного&nbsp;источника.</p>
            </div>
            <div className={cs.stayFact}>
              <h3>Кухня и&nbsp;столовая</h3>
              <p>Большой общий стол, за&nbsp;которым мы будем собираться&nbsp;вместе.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOD / ПИТАНИЕ ================= */}
      <section className={cs.section} id="food">
        <div className={cs.wrap}>
          <div className={cs.foodGrid}>
            <div>
              <div className={cs.sectionHead}>
                <div className={cs.eyebrow}>Питание</div>
                <h2>Еда, которую приготовили для&nbsp;тебя</h2>
                <p>
                  Все дни для&nbsp;нас готовит наш собственный повар из&nbsp;ресторана Inside.
                  Тебе остаётся только сесть за&nbsp;стол.
                </p>
                <p>
                  Перед ретритом мы пришлём каждой участнице меню, чтобы ты выбрала то, что
                  хочется именно&nbsp;тебе.
                </p>
                <p>
                  Ретрит начнётся с&nbsp;special dinner: в&nbsp;четверг вечером нас ждёт ужин
                  со&nbsp;специальным меню, ради которого не&nbsp;нужно ни&nbsp;готовить,
                  ни&nbsp;мыть&nbsp;посуду.
                </p>
              </div>
            </div>
            <div className={cs.foodPhoto}>
              <img src={diningPhoto} alt="Накрытый стол в столовой фермы" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= LEADERS ================= */}
      <section className={`${cs.section} ${cs.leadersTone}`} id="leaders">
        <div className={cs.wrap}>
          <div className={cs.sectionHead}>
            <div className={cs.eyebrow}>Ведущие</div>
            <h2>Кто о&nbsp;тебе позаботится</h2>
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
                  <p className={`${cs.leaderBio} ${cs.draft}`}>Описание появится совсем&nbsp;скоро.</p>
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
          <p className={cs.quoteTitle}>Мы не&nbsp;обещаем, что ты уедешь другим&nbsp;человеком</p>
          <p className={cs.quoteText}>
            Да и&nbsp;нужно ли? Возвращаться сразу в&nbsp;привычный ритм не&nbsp;придётся:
            к&nbsp;детям, мужьям, работе. Можно ещё немного побыть в&nbsp;этом состоянии, никуда
            не&nbsp;бежать и&nbsp;ничего не&nbsp;решать. Возможно, ты просто давно
            не&nbsp;отдыхала&nbsp;по-настоящему.
          </p>
        </blockquote>
      </section>

      {/* ================= BOOKING / УСЛОВИЯ БРОНИ ================= */}
      <section className={`${cs.section} ${cs.booking}`} id="booking">
        <div className={cs.wrap}>
          <div className={cs.sectionHead}>
            <div className={cs.eyebrow}>Условия</div>
            <h2>Условия участия</h2>
          </div>

          <div className={cs.bookingFacts}>
            <div className={cs.bookingFact}>
              <div className={cs.eyebrow}>Стоимость участия</div>
              <h3 className={cs.bookingPrice}>650&nbsp;€</h3>
              <p>10&ndash;13 декабря, 4&nbsp;дня и&nbsp;3&nbsp;ночи на&nbsp;{PLACE}.</p>
            </div>
            <div className={cs.bookingFact}>
              <div className={cs.eyebrow}>Early bird</div>
              <h3 className={cs.bookingPrice}>590&nbsp;€</h3>
              <p>При оплате до&nbsp;10&nbsp;ноября.</p>
            </div>
            <div className={cs.bookingFact}>
              <div className={cs.eyebrow}>Бронирование</div>
              <h3>Залог 150&nbsp;€</h3>
              <p>
                Чтобы забронировать место, нужно внести залог. Отмена возможна
                не&nbsp;позже чем за&nbsp;две недели до&nbsp;ретрита, то&nbsp;есть до&nbsp;26&nbsp;ноября.
              </p>
            </div>
          </div>
          <div className={cs.bookingIncludes}>
            <h3>В&nbsp;стоимость&nbsp;включено</h3>
            <ul>
              <li>3&nbsp;ночи проживания на&nbsp;{PLACE}</li>
              <li>Питание от&nbsp;нашего повара и&nbsp;special&nbsp;dinner</li>
              <li>Большой банный&nbsp;ритуал</li>
              <li>Йога каждое&nbsp;утро</li>
              <li>Breathwork (практика дыхания)</li>
              <li>Кино-вечер с&nbsp;какао и&nbsp;попкорном</li>
            </ul>
            <p className={cs.bookingExcluded}>Не&nbsp;включено: дорога до&nbsp;места&nbsp;проведения.</p>
          </div>
          <CtaButton>Хочу на ретрит</CtaButton>
        </div>
      </section>

      <footer className={cs.footer}>
        <div className={cs.footLogo}>выдох</div>
        <div className={cs.footDates}>10&ndash;13 декабря&nbsp;· четверг&ndash;воскресенье</div>
        <div className={cs.footPlace}>{PLACE},&nbsp;Банская&nbsp;Штявница</div>
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
            aria-label="Закрыть"
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
            aria-label="Предыдущее фото"
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
            aria-label="Следующее фото"
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
