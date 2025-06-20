const DURATION_FAST = 0.3;
const DURATION_MEDIUM = 0.5;
const DURATION_SLOW = 1;
const EASE_INOUT = "power4.inOut";
const EASE_ELASTIC = "elastic";
const moveAmount = 0.1;

const pinkCircles = {
  tr: '#pink-circle-tr',
  br: '#pink-circle-br',
  bl: '#pink-circle-bl',
  tl: '#pink-circle-tl'
};

const isMobile = window.innerWidth < 768;

gsap.set("#loader", { display: "none" });

if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
} else {
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }
}

let xN = -16,
  xP = 16,
  lineSpeed = 3

let tl_intro = gsap.timeline({ paused: true });

tl_intro.to('#graph-left', {
    xPercent: 100,
    ease: "power4.inOut",
    duration: lineSpeed,
  })
  .to("#graph-right", {
    xPercent: -100,
    ease: "power4.inOut",
    duration: lineSpeed,
  }, '<')
  .to("#loader-bubble", {
    scale: 1,
    ease: "elastic",
    duration: 5,
  }, '>-1')
  .to("#loader-icon", {
    scale: 1,
    ease: "elastic",
    duration: 5,
  }, '<+=0.3')
  .to(".loader-graph", {
    opacity: 0,
    duration: .5,
  }, '<+=0.5')
  .to("#loader-bubble", {
    scale: 5,
    ease: "elastic",
    duration: 2,
  }, '<+=0.5')
  .to("#loader-icon", {
    scale: 0,
    opacity: 0,
    ease: "power4.inOut",
    duration: 1,
  }, '<+=0.5')
  .to("#loader-headline", {
    scale: 1,
    ease: "power4.inOut",
    duration: 1,
  }, '<')
  .to("#loader-bubble", {
    scale: 11,
    opacity: 0,
    ease: "elastic",
    duration: 5,
  }, '<+=0.5')
  .to("#loader-headline", {
    opacity: 0,
    y: 8,
    ease: "power4.inOut",
    duration: 1,
  }, '<+=1')
  .to("#loader", {
    display: "none"
  }, '<+=0.5');

let tl_hero

if (!isMobile) {

  tl_hero = gsap.timeline();

  tl_hero.to('.logo', {
      y: 4,
      opacity: 100,
      duration: .3,
    })
    .to('.hero-drop', {
      yPercent: -100,
      ease: "power4.inOut",
      duration: .5,
    }, '<')
    .to(['.drop-bottom', '.drop-middle', '.drop-top'], {
      y: -4,
      opacity: 100,
      duration: .3,
      stagger: 0.3,
    }, '>')
    .to(['#hero-circle-left', '#hero-circle-right'], {
      x: (i) => i === 0 ? -16 : 16,
      opacity: 1,
      duration: 0.3,
      stagger: 0.05
    }, '>')
    .to('.pink-glow', {
      opacity: 1,
      duration: .3
    }, '<')
    .to('#pink-circle-tr', {
      opacity: .5,
      x: xN,
      y: xP,
      duration: .3
    }, '<')
    .to('#pink-circle-br', {
      opacity: .5,
      x: xN,
      y: xN,
      duration: .3
    }, '<')
    .to('#pink-circle-bl', {
      opacity: .5,
      x: xP,
      y: xN,
      duration: .3
    }, '<')
    .to('#pink-circle-tl', {
      opacity: .5,
      x: xP,
      y: xP,
      duration: .3
    }, '<')
}

const headline = new SplitType('#hero-headline', { types: 'chars' });

let tl_headline = gsap.timeline();

tl_headline.to('.hero-headline__text', {
    opacity: 1,
    duration: 0
  })
  .fromTo(headline.chars, {
    yPercent: 100,
  }, {
    yPercent: 0,
    duration: 0.5,
    stagger: { amount: 0.1 },
  }, '<');

const tagline = new SplitType('#hero-tagline', { types: 'lines, chars', charsClass: 'char' });
const chars = tagline.chars;
const heroTagline = document.getElementById('hero-tagline');

// Check if the current URL includes a specific string
const currentURL = window.location.href;

let taglineStrings = [
  'увлекают аудиторию',
  'трансформируют опыт',
  'приносят результаты',
  'звучат человечно',
];

if (currentURL.includes('/en')) {
  taglineStrings = [
    'inspire',
    'engage',
    'transform',
    'deliver results'
  ];
} else {
  taglineStrings = [
    'увлекают аудиторию',
    'трансформируют опыт',
    'приносят результаты',
    'звучат человечно',
  ];
}

let currentIndex = 0;
let tl_tagline = gsap.timeline();

tl_tagline.fromTo(chars, {
  yPercent: 100,
}, {
  yPercent: 0,
  duration: 0.5,
  stagger: { amount: 0.1 },
  onComplete: () => {

    if (heroTagline) {
        setInterval(() => {
            heroTagline.textContent = taglineStrings[currentIndex];
            currentIndex = (currentIndex + 1) % taglineStrings.length;
        }, 3000);
    }

  }
})

let tl_footer

if (!isMobile) {
  tl_footer = gsap.timeline();

  tl_footer.to('.request-form', {
      opacity: 1,
      y: 0
    })
    .to('.language-selector', {
      opacity: 1,
      y: 0
    })
    .to('.social-icons', {
      opacity: 1,
      y: 0
    }, '<')
}

let tl_light, tl_expand, tl_method, tl_reveal, tl_stats;

if (!isMobile) {
    tl_light = gsap.timeline({

    scrollTrigger: {
        trigger: '.hero-transition',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,

    }

    });

    tl_light.addLabel('start')
        .set('.hero-transition', {
            zIndex: 2,
        })
        .set('.pulse-wrapper', {
            display: "block"
        })
        .to('.pulse-circle', {
            scale: 1
        })
        .to('.pulse', {
            opacity: 1,
            stagger: 0.1
        })
        .set('.main-navigation', {
          display: "flex"
        })
        .to('.main-navigation', {
          opacity: 1,
        })
        .set('.hero-header', {
          display: "none"
        }, '<')
        .to('.pulse-wrapper', {
            x: "100%"
        })
        .from('.section_home-intro', {
            display: "none",
        })
        .from(['.home-intro__headers-wrapper', '.home-intro__paragraphs'], {
          opacity: 0,
          duration: 0.3,
          stagger: 0.05,
        })
        .addLabel('middle')
        .to('.pulse-wrapper', {
          x: "0",
        }, '+=1')
        .to('.home-intro__paragraphs', {
          opacity: 0,
          duration: 0.3
        }, '+=1')
        .to('.home-intro__headers-wrapper', {
            opacity: 0,
            duration: 0.3
        })
        .set('.section_home-intro', {
            display: "none",
        })
        .from([
          '.home-about__headline',
          '.home_about__top-paragraph',
          '.home-about__bottom-paragraph'
        ], {
          opacity: 0,
          duration: 0.3,
          stagger: 0.05,
        })
        .from('.home-about__pointer', {
            scaleX: 0,
            transformOrigin: "right",
            duration: 0.3,
        })
        .from('.home-about__pointer', {
            "--pointer-height": 0,
            "--pointer-top": 0,
            "--pointer-opacity": 0,
        })
        .addLabel('end')

}

if (!isMobile) {
    tl_expand = gsap.timeline({

    scrollTrigger: {
        trigger: '.section__home--services-wrapper',
        start: 'top bottom',
        end: 'top top',
        scrub: 0.3,
    }

    })

    

    tl_expand.to([
      '.pulse',
      '.pulse-circle',
    ], {
        opacity: 0,
        duration: 0.3,
        stagger: 0.1
    })
    .to([
    '.home-about__headline',
    '.home_about__top-paragraph',
    '.home-about__bottom-paragraph',
    '.home-about__pointer',
    ], {
      opacity: 0,
      duration: 0.3,
      stagger: 0.05
    }, '<')
    .to('.section__home--services-wrapper', {
        backgroundColor: '#fafafa',
        duration: 0.3,
        ease: 'power1.out'
      }, '<')

}

//let services = gsap.utils.toArray(".services__wrapper");
const services = document.getElementById('services__wrapper');
let tl_services;

let mm = gsap.matchMedia();

mm.add("(min-width: 768px)", () => {

  // desktop setup code here...
  tl_services = gsap.timeline({

    scrollTrigger: {
      trigger: '.section__home--services-wrapper',
      start: '200 top',
      end: 'bottom bottom',
      scrub: 0.3,
    }

  });

  tl_services.to(services, {
    //x: "-35%",
    x: () => -(services.scrollWidth - document.documentElement.clientWidth + 40) + "px",
    duration: 0.3
  })

});

mm.add("(max-width: 767px)", () => {

  // mobile setup code here...
  let items = gsap.utils.toArray('.services__item-wrapper')

  items.forEach((item) => {

    tl_services = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: 'top 75%',
        end: 'bottom bottom',
        scrub: 0.3,
      }

    });

    tl_services.from(item, {
      opacity: 0,
      duration: 5,
      stagger: 1,
    });

  });

});

if (!isMobile) {
    tl_stats = gsap.timeline({

    scrollTrigger: {
        trigger: '.stats__list',
        start: 'top 90%',
        end: 'bottom 50%',
        scrub: 0.3,
    }

    });

    tl_stats.from('.stats__color-block', {
        scaleX: 0,
        transformOrigin: "left",
        duration: 0.3,
        stagger: 0.1
    })
    .from('.stats__text', {
        opacity: 0,
        duration: 0.3,
        stagger: 0.1
    }, '<+=0.3')
}

if (!isMobile) {
    tl_method = gsap.timeline({

    scrollTrigger: {
        trigger: '.method__list',
        start: 'top 90%',
        end: 'bottom bottom',
        scrub: 0.3,
    }

    })

    tl_method.from('.method__single', {
        x: '100%',
        duration: 0.3,
        stagger: 0.1,
    })
    .from('.method__description-wrapper', {
        opacity: 0,
        duration: 0.3,
        stagger: 0.1
    }, '<+=0.3')
    .set('.hero-header', {
      display: "block"
    }, '<')
}

if (!isMobile) {
    tl_reveal = gsap.timeline({

    scrollTrigger: {
        trigger: '.page-wrapper',
        start: 'bottom 175%',
        end: 'bottom bottom',
        scrub: 0.3,
    }

    })

    tl_reveal.to('.pulse-circle', {
        scale: 0,
        duration: 1,
    })
    .to('.section__home--method', {
        opacity: 0,
        duration: 0.3,
    }, '<')
    .to('.main-navigation', {
        opacity: 0,
        duration: 0.3,
    }, '<')
}

var master = gsap.timeline()
  //.add(tl_intro)
  if (!isMobile) {
    master
    .add(tl_hero, /*'<+=6.2'*/)
  }
  //.add(tl_hero)
  master
  .add(tl_headline, '>')
  .add(tl_tagline, '<+=0.3')

  if (!isMobile) {
    master
    .add(tl_footer, '<+=0.5')
  }

if (!isMobile) {
  master
    .add(tl_light)
    .add(tl_expand)
    .add(tl_method)
    .add(tl_reveal);
}
//.add(tl_stats)
//.add(tl_about, '>')

function updatePinkCircle(selector, x, y) {
  gsap.to(selector, { x, y, duration: 0.5 });
}

document.addEventListener('mousemove', (event) => {
  const viewportCenterX = window.innerWidth / 2;
  const viewportCenterY = window.innerHeight / 2;

  const cursorX = event.clientX;
  const cursorY = event.clientY;

  const deltaX = cursorX - viewportCenterX;
  const deltaY = cursorY - viewportCenterY;

  const distanceToCenter = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

  const moveAmount = 0.1; // Adjust this value to control the movement amount

  if (cursorX < 0 || cursorX > window.innerWidth || cursorY < 0 || cursorY > window
    .innerHeight) {
    updatePinkCircle(pinkCircles.tr, xN, xP);
    updatePinkCircle(pinkCircles.br, xN, xN);
    updatePinkCircle(pinkCircles.bl, xP, xN);
    updatePinkCircle(pinkCircles.tl, xP, xP);

  } else {
    updatePinkCircle(pinkCircles.tr, xN - (deltaX / distanceToCenter * moveAmount * distanceToCenter), xP - (deltaY / distanceToCenter * moveAmount * distanceToCenter));
    updatePinkCircle(pinkCircles.br, xN - (deltaX / distanceToCenter * moveAmount * distanceToCenter) * 0.5, xN - (deltaY / distanceToCenter * moveAmount * distanceToCenter) * 0.5);
    updatePinkCircle(pinkCircles.bl, xP - (deltaX / distanceToCenter * moveAmount * distanceToCenter), xN - (deltaY / distanceToCenter * moveAmount * distanceToCenter));
    updatePinkCircle(pinkCircles.tl, xP - (deltaX / distanceToCenter * moveAmount * distanceToCenter) * 0.5, xP - (deltaY / distanceToCenter * moveAmount * distanceToCenter) * 0.5);
  }
});
