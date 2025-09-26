import React, { useState, useEffect } from 'react';

function Timer({ expiryTime }) {
    const [timeLeft, setTimeLeft] = useState("");
    const [intId, setIntId] = useState();

    useEffect(() => {
        calcTimeLeft();

        const intId = setInterval(() => {
            calcTimeLeft();
        }, 1000);
        setIntId(intId);
        
        return () => clearInterval(intId);
    }, []);

        function calcTimeLeft() {
            const milLeft = expiryTime - Date.now();
            if (milLeft <= 0) {
                clearInterval(intId);
                setTimeLeft("Expired");
                return;
            }
            
            const secLeft = milLeft / 1000;
            const minLeft = secLeft / 60;
            const hourLeft = minLeft / 60;

            setTimeLeft(
                Math.floor(hourLeft) + "h " +
                Math.floor(minLeft % 60) + "m " +
                Math.floor(secLeft % 60) + "s"
            );
        };
  return (
    <div className='de_countdown'>{timeLeft}</div>
  )
}

export default Timer;