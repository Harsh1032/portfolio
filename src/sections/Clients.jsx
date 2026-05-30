import { useRef } from "react";
import { clientReviews } from "../constants/index.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Clients = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  const reviews = [...clientReviews, ...clientReviews];

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".client-review-card");

      gsap.from(cards, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      tweenRef.current = gsap.to(trackRef.current, {
        xPercent: -50,
        duration: 70,
        ease: "none",
        repeat: -1,
      });

      cards.forEach((card) => {
        card.addEventListener("mouseenter", () => tweenRef.current.pause());
        card.addEventListener("mouseleave", () => tweenRef.current.play());
      });

      return () => {
        tweenRef.current?.kill();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="c-space my-20 overflow-hidden">
      <div className="mb-10">
        <h3 className="head-text">Hear from My Clients</h3>
        <p className="text-white-600 mt-3 max-w-2xl">
          Real feedback from clients I’ve worked with across web development,
          dashboards, integrations, and responsive applications.
        </p>
      </div>

      <div className="client-slider">
        <div ref={trackRef} className="client-track">
          {reviews.map((item, index) => (
            <div
              key={`review-${item.id}-${index}`}
              className="client-review-card"
            >
              <p className="client-review-text">“{item.review}”</p>

              <div className="client-card-footer">
                <div>
                  <p className="client-name">{item.name}</p>
                </div>

                <div className="client-stars">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <img
                      key={starIndex}
                      src="/assets/star.png"
                      alt="star"
                      className="w-5 h-5"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;