import { Colors } from '../../Constants';
import './CountdownTimer.scss';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { Typography } from '@mui/material';

interface CountdownTimerProps {
    onTimerComplete?: () => void;
}

export const CountdownTimer = (props: CountdownTimerProps): JSX.Element | null => {
    
    const { onTimerComplete } = props;

    const styles = {
        innerText: {
            color: Colors.LightGray
        },
        timer: {
            marginBottom: '20px'
        }
    }

    const CountdownText = ({ remainingTime }: { remainingTime: number }) => {
        return (
            <div className="timer">
                <Typography 
                    variant="button" 
                    display="block" 
                    style={styles.innerText} 
                    gutterBottom>
                        Game restarts in
                </Typography>
                
                <div className="value">{remainingTime}</div>
                
                <Typography
                    variant="button"
                    display="block"
                    style={styles.innerText}
                    component="h2"
                    gutterBottom>
                        seconds
                </Typography>
            </div>
        );
    };

    return (
        <div className="timer-wrapper" style={styles.timer}>
            <CountdownCircleTimer
                isPlaying
                duration={10}
                colors={`#${Colors.Primary.replace('#', '')}`}
                strokeWidth={25}
                size={250}
                onComplete={onTimerComplete}
            >
                {CountdownText}
            </CountdownCircleTimer>
        </div>
    );
};

export default CountdownTimer;
