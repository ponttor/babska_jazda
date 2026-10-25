import { useEffect, useRef, useState } from 'react'
import { Head } from '@inertiajs/react'

import logoWhite from '../../assets/logo-white.png'
import heroVideoUrl from '../../assets/hero-parenie.mp4'
import heroPoster from '../../assets/hero-poster.jpg'
import practiceHallPhoto from '../../assets/practice-hall.jpg'
import stayDiningPhoto from '../../assets/stay-dining.jpg'
import stayCourtyardPhoto from '../../assets/stay-courtyard.jpg'
import venueExteriorPhoto from '../../assets/venue-exterior.jpg'
import room1Photo from '../../assets/room-1.jpg'
import room2Photo from '../../assets/room-2.jpg'
import room3Photo from '../../assets/room-3.jpg'
import room4Photo from '../../assets/room-4.jpg'
import courtyardBuildingPhoto from '../../assets/courtyard-building.jpg'
import courtyardTerracePhoto from '../../assets/courtyard-terrace.jpg'
import leaderAnnaPhoto from '../../assets/leader-anna.jpg'
import leaderTatianaPhoto from '../../assets/leader-tatiana.jpg'
import banyaPareniePhoto from '../../assets/banya-parenie.jpg'
import logoSGraphic from '../../assets/logo-s.png'
import venueSaunaPhoto from '../../assets/venue-sauna.jpg'
import cs from './index.module.css'

const SCHEDULE = [
  {
    name: 'Пятница',
    date: '27 ноября,\u00a0заезд',
    items: [
      { time: '15:00–18:00', what: 'Заезд, размещение,\u00a0знакомство' },
      { time: '18:30–19:30', what: 'Ужин' },
      { time: '20:00–22:00', what: 'Вечерняя дыхательная практика и\u00a0знакомство' },
      { time: 'с 22:00', what: 'Свободное время' },
    ],
  },
  {
    name: 'Суббота',
    date: '28 ноября',
    items: [
      { time: '9:00–10:00', what: 'Завтрак' },
      { time: '11:00–12:30', what: 'Телесная практика с\u00a0Аней' },
      { time: '12:30–13:30', what: 'Обед' },
      { time: '13:30–15:00', what: 'Свободное время,\u00a0прогулка' },
      { time: '15:00–20:00', what: 'Женская баня с\u00a0Таней' },
      { time: '20:00–21:00', what: 'Ужин' },
      { time: '21:00–22:00', what: 'Вечерняя практика' },
      { time: 'с 22:00', what: 'Свободное время' },
    ],
  },
  {
    name: 'Воскресенье',
    date: '29 ноября,\u00a0отъезд',
    items: [
      { time: '9:00–10:00', what: 'Завтрак' },
      { time: '11:00–12:30', what: 'Завершающая практика' },
      { time: '13:00', what: 'Отъезд' },
    ],
  },
]

// Ссылка для кнопки «Связаться с нами» — Telegram
const CONTACT_URL = 'https://t.me/nazarovateam'

function CtaButton({ children }: { children: string }) {
  return (
    <a className={cs.contactBtn} href={CONTACT_URL} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

type GalleryPhoto = { src: string; alt: string }

const VENUE_PHOTOS: GalleryPhoto[] = [
  { src: courtyardBuildingPhoto, alt: 'Мельница со стороны внутреннего двора' },
  { src: stayCourtyardPhoto, alt: 'Внутренний двор мельницы, увитый цветами' },
  { src: courtyardTerracePhoto, alt: 'Крытая терраса с гортензией у пруда' },
  { src: venueSaunaPhoto, alt: 'Баня изнутри: полки, шайка и печь с камнями' },
]

const STAY_PHOTOS: GalleryPhoto[] = [
  { src: room1Photo, alt: 'Спальня с бархатной кушеткой и розовыми шторами' },
  { src: room2Photo, alt: 'Спальня в полоску, с плетёным светильником' },
  { src: room3Photo, alt: 'Спальня в тёплых тонах с деревянным шкафом' },
  { src: room4Photo, alt: 'Спальня с розовым текстилем и плетёным ковром' },
]

export default function RetreatIndex() {
  const [lightbox, setLightbox] = useState<{ photos: GalleryPhoto[]; index: number } | null>(null)
  const heroVideoRef = useRef<HTMLVideoElement>(null)

  // Автозапуск фонового видео на телефонах: iOS/Android разрешают его только при
  // выставленном muted-атрибуте в DOM (React сам его не проставляет), плюс страховка
  // на первое касание, если браузер всё же заблокировал автозапуск.
  useEffect(() => {
    const video = heroVideoRef.current
    if (!video) return
    video.muted = true
    video.defaultMuted = true
    video.setAttribute('muted', '')
    video.setAttribute('playsinline', '')
    video.setAttribute('webkit-playsinline', '')

    const tryPlay = () => {
      const p = video.play()
      return p && typeof p.then === 'function' ? p : Promise.resolve()
    }
    // iOS засчитывает жестом только touchend/click, а не touchstart и не скролл
    const events = ['touchend', 'pointerup', 'click', 'keydown'] as const
    const stop = () => events.forEach((e) => window.removeEventListener(e, onInteract))
    const onInteract = () => {
      tryPlay().then(stop).catch(() => {})
    }
    events.forEach((e) => window.addEventListener(e, onInteract, { passive: true }))
    video.addEventListener('canplay', () => tryPlay().then(stop).catch(() => {}), { once: true })
    tryPlay().then(stop).catch(() => {})
    return stop
  }, [])

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
      <Head title="Soft: ретрит выходного дня">
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
          <a href="#leaders">Ведущие</a>
          <a href="#booking">Условия</a>
        </nav>
        <video
          ref={heroVideoRef}
          className={cs.heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={heroPoster}
          aria-hidden="true"
        >
          <source src={heroVideoUrl} type="video/mp4" />
        </video>
        <div className={cs.heroScrim} aria-hidden="true" />
        <div className={cs.heroInner}>
          <img className={cs.heroLogo} src={logoWhite} alt="Soft: weekend retreat" />
          <div className={cs.heroDates}>
            <span className={cs.heroDatesRange}>27&ndash;29 ноября</span>
            <span className={cs.heroDatesDays}>пятница&nbsp;&ndash;&nbsp;воскресенье</span>
          </div>
          <div className={cs.heroPlace}>Salvey&nbsp;Mühle by&nbsp;ZaZa,&nbsp;Бранденбург</div>
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
          <p className={cs.quoteTitle}>Три дня без будильника</p>
          <p className={cs.quoteText}>
            Мягкие телесные практики, банные ритуалы с&nbsp;вениками, прогулки и&nbsp;тишина природы. Чтобы&nbsp;наконец выдохнуть, отпустить напряжение и&nbsp;вспомнить, каково это, когда о&nbsp;тебе&nbsp;заботятся.
          </p>
        </blockquote>
        <div className={cs.ctaRow}>
          <CtaButton>Хочу на ретрит</CtaButton>
        </div>
      </section>

      {/* ================= PROGRAM ================= */}
      <section className={cs.section} id="program">
        <div className={cs.wrap}>
          <div className={cs.sectionHead}>
            <div className={cs.eyebrow}>Программа</div>
            <h2>Три дня, когда можно никуда не&nbsp;спешить</h2>
            <p className={cs.programLede}>
              Женский ретрит выходного дня, где мы наконец вспомним о&nbsp;своём любимом теле
              и&nbsp;о&nbsp;том, как оно ждёт заботы. Дыхательные и&nbsp;телесные практики
              в&nbsp;зале с&nbsp;видом на&nbsp;сад, женская баня с&nbsp;мягким паром и&nbsp;парением
              вениками, неспешные трапезы и&nbsp;тишина природного парка Unteres&nbsp;Odertal
              вокруг. Главная задача: отдохнуть и&nbsp;насладиться временем для&nbsp;себя. Можно
              гулять по&nbsp;территории мельницы, лежать с&nbsp;книгой или&nbsp;ничего
              не&nbsp;делать, на&nbsp;всё это&nbsp;есть&nbsp;время.
            </p>
          </div>

          <div className={cs.programFacts}>
            <div className={cs.programFact}>
              <div className={cs.num}>01</div>
              <h3>Дыхание и&nbsp;тело</h3>
              <p>
                Дыхательные сессии и&nbsp;телесные практики в&nbsp;светлом&nbsp;зале.
              </p>
            </div>
            <div className={cs.programFact}>
              <div className={cs.num}>02</div>
              <h3>Баня и&nbsp;парение</h3>
              <p>Групповая женская баня с&nbsp;мягким паром и&nbsp;парением вениками.</p>
            </div>
            <div className={cs.programFact}>
              <div className={cs.num}>03</div>
              <h3>Природа и&nbsp;тишина</h3>
              <p>Сад, ручей и&nbsp;пруд на&nbsp;территории, прогулки и&nbsp;лёгкий хайкинг по&nbsp;парку.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SCHEDULE ================= */}
      <section className={`${cs.section} ${cs.schedule}`} id="schedule">
        <div className={cs.wrap}>
          <div className={cs.sectionHead}>
            <div className={cs.eyebrow}>Расписание</div>
            <h2>Как проходят&nbsp;выходные</h2>
          </div>

          <div className={cs.scheduleDays}>
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
            Это ориентировочная программа. Мы оставили достаточно свободного времени, а&nbsp;участие
            в&nbsp;практиках и&nbsp;активностях по&nbsp;желанию.
          </p>
          <div className={cs.ctaRow}>
            <CtaButton>Хочу на ретрит</CtaButton>
          </div>
        </div>
      </section>

      {/* ================= LEADERS ================= */}
      <section className={cs.section} id="leaders">
        <div className={cs.wrap}>
          <div className={cs.sectionHead}>
            <div className={cs.eyebrow}>Ведущие</div>
            <h2>Кто проводит&nbsp;выходные</h2>
          </div>

          <div className={cs.leadersGrid}>
            <div>
              <div className={cs.leaderPhoto}>
                <img src={leaderAnnaPhoto} alt="Анна Назарова" />
              </div>
              <h3 className={cs.leaderName}>Анна Назарова</h3>
              <div className={cs.leaderRole}>Актриса&nbsp;· автор курса «Дружба с&nbsp;телом»</div>
              <p className={cs.leaderBio}>
                Профессиональная актриса, мама двоих детей. Несколько лет назад переехала
                из&nbsp;Москвы в&nbsp;Берлин, где живёт и&nbsp;работает в&nbsp;кино и&nbsp;театре.
                Автор курса «Дружба с&nbsp;телом»: более 10 лет идёт к&nbsp;дружбе со&nbsp;своим
                телом через спорт, ежедневную зарядку и&nbsp;телесные практики. Собственный опыт РПП
                сформировал её подход: слышать тело, принимать его и&nbsp;выстраивать с&nbsp;ним
                дружеские отношения. Баня для&nbsp;неё становится лучшим способом замедлиться,
                переключить внимание с&nbsp;головы на&nbsp;тело&nbsp;и&nbsp;обновиться.
              </p>
            </div>

            <div>
              <div className={cs.leaderPhoto}>
                <img src={leaderTatianaPhoto} alt="Татьяна Илларионова" />
              </div>
              <h3 className={cs.leaderName}>Татьяна Илларионова</h3>
              <div className={cs.leaderRole}>Психолог&nbsp;· пармастерица</div>
              <p className={cs.leaderBio}>
                Сертифицированный фасилитатор дыхательных и&nbsp;телесных техник с&nbsp;многолетним
                опытом. Помогает женщинам услышать своё тело, снять напряжение и&nbsp;увеличить его
                энергоёмкость. Проводит трансформирующие дыхательные сессии и&nbsp;нежные парения,
                которые позволяют высвободить застарелые эмоции и&nbsp;блоки, найти внутреннюю
                гармонию и&nbsp;почувствовать лёгкость.
              </p>
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
        <img className={`${cs.bigS} ${cs.bigSBanya}`} src={logoSGraphic} aria-hidden="true" alt="" />
        <div className={cs.wrap}>
          <div className={cs.banyaHead}>
            <div className={cs.eyebrow}>Ритуал</div>
            <h2>Нежная баня</h2>
            <p className={cs.banyaSub}>
              Для&nbsp;тех, кто соскучился по&nbsp;родной банной традиции, запаху веников
              и&nbsp;долгому отдыху&nbsp;без&nbsp;спешки.
            </p>
          </div>

          <div className={cs.ritual}>
            <h3>Большой женский банный ритуал</h3>
            <p className={cs.ritualLede}>
              Пятичасовой банный ритуал с&nbsp;несколькими заходами в&nbsp;парную, постепенным прогревом, парением вениками (кавказский и&nbsp;канадский&nbsp;дуб) и&nbsp;контрастными процедурами.
            </p>
            <p>
              Ритуал состоит из&nbsp;нескольких этапов, между которыми мы будем отдыхать, пить травяной чай и&nbsp;восстанавливать силы. В&nbsp;программе также фитотерапия с&nbsp;использованием ароматных трав и&nbsp;практика звукового расслабления (саундхилинг).
            </p>
          </div>
        </div>
      </section>

      {/* ================= PRACTICES ================= */}
      <section className={cs.section} id="practices">
        <div className={cs.wrap}>
          <div className={cs.practicesHead}>
            <div className={cs.sectionHead}>
              <div className={cs.eyebrow}>Практики</div>
              <h2>Практики, которые помогают&nbsp;замедлиться</h2>
              <p>
                Для&nbsp;участия не&nbsp;нужна специальная подготовка или&nbsp;опыт занятий йогой.
                Аня и&nbsp;Таня проведут мягкие дыхательные и&nbsp;телесные практики, в&nbsp;которых главное:
                внимание к&nbsp;себе, а&nbsp;не&nbsp;правильность выполнения&nbsp;упражнений.
              </p>
            </div>
            <div className={cs.practicesPhoto}>
              <img src={practiceHallPhoto} alt="Зал для практик: балки, тёплый свет, тишина" />
            </div>
          </div>

          <div className={cs.practicesGrid}>
            <div className={cs.practiceItem}>
              <div className={cs.eyebrow}>01</div>
              <h3>Дыхательные практики</h3>
              <p>
                Осознанное связное дыхание мягко выводит из&nbsp;головы в&nbsp;тело и&nbsp;снимает
                накопленное напряжение.
              </p>
            </div>
            <div className={cs.practiceItem}>
              <div className={cs.eyebrow}>02</div>
              <h3>Телесные практики</h3>
              <p>
                Мягкая работа с&nbsp;телом, растяжка и&nbsp;гвоздестояние, в&nbsp;своём&nbsp;темпе.
              </p>
            </div>
            <div className={cs.practiceItem}>
              <div className={cs.eyebrow}>03</div>
              <h3>Женская баня и&nbsp;парение</h3>
              <p>
                Большой ритуал, гвоздь программы нашего ретрита. Подробнее выше,
                в&nbsp;разделе&nbsp;«Нежная&nbsp;баня».
              </p>
            </div>
            <div className={cs.practiceItem}>
              <div className={cs.eyebrow}>04</div>
              <h3>Тишина и&nbsp;прогулки</h3>
              <p>
                Свободное время и&nbsp;природный парк Unteres&nbsp;Odertal вокруг. Можно гулять,
                глубоко дышать и&nbsp;подолгу смотреть&nbsp;на&nbsp;горизонт.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= VENUE / МЕСТО ================= */}
      <section className={`${cs.section} ${cs.venue}`} id="venue">
        <div className={cs.wrap}>
          <div className={cs.venueIntro}>
            <div className={cs.venuePhotoMain}>
              <img src={venueExteriorPhoto} alt="Историческая водяная мельница Salvey Mühle снаружи" />
            </div>
            <div className={cs.venueText}>
              <div className={cs.eyebrow}>Место</div>
              <h2>Salvey&nbsp;Mühle by&nbsp;ZaZa</h2>
              <p>
                Мы будем жить на&nbsp;старой водяной мельнице посреди природного парка «Нижняя
                долина Одера». У&nbsp;мельницы 20&nbsp;000&nbsp;м² собственной территории
                и&nbsp;никаких соседей поблизости, только сад, пруд, ручей&nbsp;и&nbsp;холмы.
              </p>
              <p>
                Мельнице больше 760&nbsp;лет. Хозяева бережно её отреставрировали, сохранив
                деревянные полы, двери и&nbsp;окна. Здесь тихо, много воздуха и&nbsp;достаточно
                места, чтобы гулять, отдыхать у&nbsp;воды и&nbsp;никуда&nbsp;не&nbsp;спешить.
              </p>
            </div>
          </div>

          <div className={cs.venueGrid}>
            <div className={cs.venueItem}>
              <div className={cs.eyebrow}>Зал</div>
              <h3>Зал для практик</h3>
              <p>
                Отдельное светлое пространство для&nbsp;йоги, телесных
                и&nbsp;групповых&nbsp;занятий.
              </p>
            </div>
            <div className={cs.venueItem}>
              <div className={cs.eyebrow}>Баня</div>
              <h3>Просторная сауна для&nbsp;группового парения</h3>
              <p>
                Стоит отдельно от&nbsp;жилого дома, рядом два душа и&nbsp;туалет. После парения
                можно охлаждаться в&nbsp;ручье, который течёт&nbsp;по&nbsp;территории.
              </p>
            </div>
            <div className={cs.venueItem}>
              <div className={cs.eyebrow}>Природа</div>
              <h3>Unteres Odertal</h3>
              <p>
                Мельница стоит уединённо среди сада, ручья и&nbsp;пруда. Вокруг природный парк,
                озеро и&nbsp;маршруты для&nbsp;прогулок и&nbsp;велосипеда. Ближайший город: Гарц
                (Одер),&nbsp;около&nbsp;6&nbsp;км.
              </p>
            </div>
          </div>

          <div className={cs.venueBanner}>
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
                <span className={cs.place}>Salvey&nbsp;Mühle by&nbsp;ZaZa</span>
                Salveymühle 3, 16307 Gartz (Oder)-Geesow, Brandenburg
              </div>
            </div>
            <div>
              <h3 className={cs.eyebrow}>Как добраться из&nbsp;Берлина</h3>
              <p>На&nbsp;машине около полутора часов от&nbsp;Berlin Alexanderplatz.</p>
              <p>
                На&nbsp;поезде ближайшая станция Tantow, примерно в&nbsp;2 км от&nbsp;мельницы;
                оттуда будет организован&nbsp;трансфер.
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
            <h2>Уютный дом среди&nbsp;природы</h2>
            <p>
              На&nbsp;три дня мы поселимся в&nbsp;Salvey&nbsp;Mühle, исторической водяной мельнице
              в&nbsp;Бранденбурге, примерно в&nbsp;полутора часах езды&nbsp;от&nbsp;Берлина.
            </p>
            <p>
              В&nbsp;нашем распоряжении будет отдельный двухэтажный жилой дом Mühlenwohnhaus
              с&nbsp;восемью спальнями, общей гостиной, столовой и&nbsp;оборудованной&nbsp;кухней.
            </p>
            <p>
              Дом рассчитан на&nbsp;12&nbsp;человек, поэтому наш ретрит пройдёт
              в&nbsp;камерной&nbsp;обстановке.
            </p>
          </div>

          <div className={cs.stayGallery}>
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

          <div className={cs.stayFactsTitle}>Размещение</div>
          <div className={cs.stayFacts}>
            <div className={cs.stayFact}>
              <h3>Двухместное размещение</h3>
              <p>
                Четыре уютные спальни для&nbsp;двух человек. Можно приехать с&nbsp;подругой
                или&nbsp;разделить комнату с&nbsp;другой&nbsp;участницей.
              </p>
            </div>
            <div className={cs.stayFact}>
              <h3>Одноместное размещение</h3>
              <p>Четыре отдельные спальни для&nbsp;тех, кому важно личное&nbsp;пространство.</p>
            </div>
            <div className={cs.stayFact}>
              <h3>Ванные комнаты</h3>
              <p>
                В&nbsp;доме четыре ванные комнаты. Каждая из&nbsp;них находится в&nbsp;общем
                пользовании у&nbsp;двух соседних спален: одной двухместной
                и&nbsp;одной&nbsp;одноместной.
              </p>
              <p>Таким образом, одной ванной пользуются не&nbsp;более трёх&nbsp;человек.</p>
            </div>
            <div className={cs.stayFact}>
              <h3>Что&nbsp;ещё есть в&nbsp;доме</h3>
              <p>
                Общая гостиная, просторная столовая, полностью оборудованная кухня, большой сад,
                ручей и&nbsp;места для&nbsp;отдыха на&nbsp;свежем&nbsp;воздухе.
              </p>
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
                <h2>Вкусная еда без&nbsp;забот о&nbsp;готовке</h2>
                <p>
                  Все три дня с&nbsp;нами будет личный повар, которая приготовит завтраки, обеды
                  и&nbsp;ужины из&nbsp;свежих сезонных&nbsp;продуктов.
                </p>
                <p>
                  Нас ждёт домашняя кухня: знакомые, понятные блюда из&nbsp;простых, свежих
                  и&nbsp;сезонных продуктов, красиво сервированный стол и&nbsp;неспешные
                  совместные&nbsp;трапезы.
                </p>
                <p>
                  В&nbsp;течение дня будут доступны чай, кофе, вода и&nbsp;фрукты.
                  При&nbsp;составлении меню учтём пищевые аллергии и&nbsp;особенности
                  питания&nbsp;участниц.
                </p>
              </div>
            </div>
            <div className={cs.foodPhoto}>
              <img src={stayDiningPhoto} alt="Общая столовая в доме мельницы" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= BOOKING / УСЛОВИЯ БРОНИ ================= */}
      <section className={`${cs.section} ${cs.booking}`} id="booking">
        <img className={`${cs.bigS} ${cs.bigSBooking}`} src={logoSGraphic} aria-hidden="true" alt="" />
        <div className={cs.wrap}>
          <div className={cs.sectionHead}>
            <div className={cs.eyebrow}>Условия</div>
            <h2>Условия брони</h2>
          </div>

          <div className={cs.bookingFacts}>
            <div className={cs.bookingFact}>
              <div className={cs.eyebrow}>Стоимость участия</div>
              <h3 className={cs.bookingPrice}>570&nbsp;€</h3>
              <p>Общий тариф.</p>
            </div>
            <div className={cs.bookingFact}>
              <div className={cs.eyebrow}>Одноместный номер</div>
              <h3 className={cs.bookingPrice}>650&nbsp;€</h3>
              <p>Стоимость участия при&nbsp;проживании в&nbsp;одноместном&nbsp;номере.</p>
            </div>
            <div className={cs.bookingFact}>
              <div className={cs.eyebrow}>Бронирование</div>
              <h3>Предоплата 150&nbsp;€</h3>
              <p>
                Чтобы забронировать участие, необходимо внести предоплату. При&nbsp;отмене брони
                менее чем за&nbsp;2,5&nbsp;недели до&nbsp;заезда предоплата не&nbsp;возвращается.
              </p>
            </div>
          </div>
          <div className={cs.bookingIncludes}>
            <h3>В&nbsp;стоимость&nbsp;включено</h3>
            <ul>
              <li>2 ночи проживания в&nbsp;Salvey&nbsp;Mühle</li>
              <li>Питание по&nbsp;программе</li>
              <li>Телесные практики с&nbsp;Аней и&nbsp;дыхательные практики с&nbsp;Таней</li>
              <li>Женская баня</li>
              <li>Все групповые&nbsp;активности</li>
            </ul>
            <p className={cs.bookingExcluded}>Не&nbsp;включено: дорога до&nbsp;места&nbsp;проведения.</p>
          </div>
          <CtaButton>Забронировать место</CtaButton>
        </div>
      </section>

      <footer className={cs.footer}>
        <div className={cs.footLogo}>soft</div>
        <div className={cs.footDates}>27&ndash;29 ноября&nbsp;· пятница&ndash;воскресенье</div>
        <div className={cs.footPlace}>Salvey&nbsp;Mühle by&nbsp;ZaZa,&nbsp;Brandenburg</div>
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
