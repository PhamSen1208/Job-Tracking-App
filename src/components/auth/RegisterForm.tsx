import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
            setError("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        if (!email.includes("@")) {
            setError("Email không hợp lệ.");
            return;
        }

        if (password.length < 6) {
            setError("Mật khẩu phải có ít nhất 6 ký tự.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Mật khẩu xác nhận không khớp.");
            return;
        }

        try {
            setIsLoading(true);
            // gọi register context (sau này nối API thật)
            await register(email, password);
            navigate("/dashboard");
        } catch (err) {
            setError("Đăng ký thất bại, vui lòng thử lại.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/*Email*/}
            <div className="space-y-2">
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-300">
                        Email
                </label>
                <input 
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full rounded
                        border border-slate-700 bg-slate-900/60
                        px-3 py-2
                        text-sm text-slate-50
                        focus:border-emerald-500 focus: outline-none focus:ring-1 focus: ring-emerald-500"
                    placeholder="example@gmail.com"/>
            </div>

            {/*Mật khẩu*/}
            <div className="space-y-2">
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-300">
                        Mật khẩu
                </label>
                <input 
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full rounded
                        border border-slate-700 bg-slate-900/60
                        px-3 py-2
                        text-sm text-slate-50
                        focus:border-emerald-500 focus: outline-none focus:ring-1 focus: ring-emerald-500"
                    placeholder="••••••••"/>
            </div>

            {/*Xác nhận mật khẩu*/}
            <div className="space-y-2">
                <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-slate-300">
                        Xác nhận mật khẩu
                </label>
                <input 
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="block w-full rounded
                        border border-slate-700 bg-slate-900/60
                        px-3 py-2
                        text-sm text-slate-50
                        focus:border-emerald-500 focus: outline-none focus:ring-1 focus: ring-emerald-500"
                    placeholder="••••••••"/>
            </div>

            <button 
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center font-medium px-4 py-2.5 bg-emerald-500 rounded-lg text-lg mt-10 disabled:cursor-not-allowed disabled:opacity-70">
                {isLoading ? "Đang đăng ký..." : "Đăng ký"}
            </button>

            {error && (
                <p className="text-xs text-red-400">
                    {error}
                </p>
            )}

            <div className="relative py-2 text-center text-xs text-slate-500">
                <span className="absolute inset-x-0 top-1/2 -z-10 h-px bg-slate-800" />
                <span className="relative bg-slate-900/60 px-3">Đã có tài khoản</span>
            </div>
        </form>
    )
}
export default RegisterForm