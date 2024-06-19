type Player = {
    name: string;
    score: number;
    isCurrentPlayer: boolean;
}

const Player = ({ name, score, isCurrentPlayer }: Player) => {
    return (
        <div
            style={{
                fontWeight: isCurrentPlayer ? "bold" : "normal",
                marginBottom: "20px",
                fontSize: "17px",
            }}
        >
            {name} - {score}
        </div>
    )
};

export default Player;