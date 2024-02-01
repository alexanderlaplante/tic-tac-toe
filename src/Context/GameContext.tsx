import React, { createContext, useContext, useState, ReactNode } from 'react';

type GameContextType = {
    gameMode: string;
    setGameMode: (gameMode: string) => void;
    playerMarker: 'X' | 'O';
    setPlayerMarker: (playerMarker: 'X' | 'O') => void;
    difficulty: string;
    setDifficulty: (difficulty: string) => void;
    wins: { X: number; O: number; draws: number };
    setWins: (wins: { X: number; O: number; draws: number }) => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
};

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [gameMode, setGameMode] = useState<string>('AI');
    const [playerMarker, setPlayerMarker] = useState<'X' | 'O'>('X');
    const [difficulty, setDifficulty] = useState<string>('Easy');
    const [wins, setWins] = useState<{ X: number; O: number; draws: number }>({ X: 0, O: 0, draws: 0 });

    return (
        <GameContext.Provider value={{ gameMode, setGameMode, playerMarker, setPlayerMarker, difficulty, setDifficulty, wins, setWins }}>
            {children}
        </GameContext.Provider>
    );
};
