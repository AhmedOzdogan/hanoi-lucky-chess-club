import { Outlet } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import Input from '../components/Input';
import ButtonPrimary from '../components/Button/ButtonPrimary';
import { useUser } from "../hooks/useUser";
import type { ChessStats } from "../hooks/useUser";
import ChessLoading from '../components/ChessboardComps/ChessLoading';
function Settings() {

    const user = useUser();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const chessStats = useRef<ChessStats>(user.chessStats);

    useEffect(() => {
        if (!user.loading && user.profile && user.user) {
            setUsername(user.profile.username ?? '');
            setEmail(user.user.email ?? '');
            chessStats.current = user.chessStats;
        }
    }, [user.loading]);

    if (user.loading) {
        return (
            <div className='flex flex-1'>
                <ChessLoading
                    text="Loading user data" />
            </div>
        );
    }

    return (
        <div className="p-6 max-w-2xl mx-auto bg-club-light/60 border border-black/20 rounded-2xl shadow-lg space-y-8">
            <div className="space-y-4 bg-white/60 p-4 rounded-xl border border-black/10">
                <h2 className="text-lg font-semibold mb-2">Profile</h2>
                <Input value={username} onChange={(e) => setUsername(e.target.value)} />
                <Input

                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="space-y-4 bg-white/60 p-4 rounded-xl border border-black/10">
                <h2 className="text-lg font-semibold">Chess.com</h2>
                <Input value={chessStats.current?.chess_com_name || ''} onChange={(e) => {
                    if (chessStats.current) {
                        chessStats.current.chess_com_name = e.target.value;
                    }
                }} />
                <p>
                    Stats are defult 1200. If you are seeing 1200 it means you have not
                    connected your chess.com account yet.
                    Please check your username and update your stats
                </p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                        <h3 className="text-lg font-medium">blitz</h3>
                        <p>Rating: {chessStats.current?.chess_com_blitz || 'N/A'}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">bullet</h3>
                        <p>Rating: {chessStats.current?.chess_com_bullet || 'N/A'}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">rapid</h3>
                        <p>Rating: {chessStats.current?.chess_com_rapid || 'N/A'}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">daily</h3>
                        <p>Rating: {chessStats.current?.chess_com_daily || 'N/A'}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">960 daily</h3>
                        <p>Rating: {chessStats.current?.chess_com_960_daily || 'N/A'}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">title</h3>
                        <p>Rating: {chessStats.current?.chess_com_title || 'N/A'}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">fide rating</h3>
                        <p>Rating: {chessStats.current?.fide_rating || 'N/A'}</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-3 pt-4">
                <ButtonPrimary label="Reset Password" onClick={() => {
                    // Handle reset password logic here
                }} />

                <ButtonPrimary label="Fetch Chess.com Stats" onClick={async () => {
                    return;
                    // Fetch chess.com stats logic here
                    // You can use chessStats.current?.chess_com_name to get the username
                }} />

                <ButtonPrimary label="Update Profile" onClick={() => {
                    // Handle profile update logic here
                }} />
            </div>

            <div className="pt-6 border-t border-black/10">
                <Outlet />
            </div>
        </div>
    );
}

export default Settings;