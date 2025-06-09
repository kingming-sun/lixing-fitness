import React, { useState, useEffect } from 'react';
import './BlackFridayBanner.css';

const BlackFridayBanner = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // 设置一个未来的结束时间
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7); // 7天后结束

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="black-friday-banner">
      <div className="banner-content">
        <h2>Black Friday Sale Ends:</h2>
        <div className="countdown">
          <div className="time-unit">
            <span className="time-number">{timeLeft.days}</span>
            <span className="time-label">Days</span>
          </div>
          <div className="time-unit">
            <span className="time-number">{timeLeft.hours}</span>
            <span className="time-label">Hrs</span>
          </div>
          <div className="time-unit">
            <span className="time-number">{timeLeft.minutes}</span>
            <span className="time-label">Mins</span>
          </div>
          <div className="time-unit">
            <span className="time-number">{timeLeft.seconds}</span>
            <span className="time-label">Sec</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlackFridayBanner; 