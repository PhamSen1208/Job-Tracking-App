import { createContext, useContext, useEffect, useState, useMemo } from "react"

type User = {
    email: string
}

// Tạo kiểu dữ liệu cho user và context
type AuthContextValue = {
    user: User | null
    isAuthenticated: boolean
    token: string | null
    isLoading: boolean
    error: string| null
    login: (email: string, password: string) => Promise<void>
    register: (email: string, password: string) => Promise<void>
    logout: () => void
    clearError: () => void
}

//Kho dữ liệu chung lưu thông tin AuthContextValue
const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const STORAGE_KEY = "jobster_auth_user";

//Bọc app và cung cấp AuthContext cho toàn bộ App
//children : các component được bọc trong AuthProvider
export const AuthProvider = ({children} : {children: React.ReactNode}) => {

    //Lấy thông tin user từ localStorage khi app khởi động
    const getInitialAuth = () => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try { 
                return JSON.parse(stored); 
            } catch 
            { return null; }
        }
        return null;
    }
    const initialAuth = getInitialAuth();
    //Lưu thông tin user và token 
    const [user, setUser] = useState<User | null>(initialAuth?.user || null)
    const [token, setToken] = useState<string | null>(initialAuth?.token || null);
    
    const [isLoading, setIsLoading] = useState(false);
    const [error,setError] = useState<string | null>(null);
    const isAuthenticated = !!user && !!token

    //Cập nhật React State (setUser) và localStorage khi thay đổi user
    const persistAuth = (nextUser: User | null, nextToken: string | null) => {
        //Cập nhật state
        setUser(nextUser);
        setToken(nextToken);
        if(nextUser && nextToken)
        {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({user: nextUser, token:nextToken}));

        }
        else{
            localStorage.removeItem(STORAGE_KEY);
        }
    }

    const login = async(email: string, _password: string) => {
        setError(null);
        setIsLoading(true);
        
        try {
            //Mô phỏng call API (test)
            await new Promise(resolve => setTimeout(resolve,800));
            const testToken = `test-token-login-${email}`;
            persistAuth({email}, testToken);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Đăng ký thất bại";
            setError(message);
            throw err;
        }
        finally
        {
            setIsLoading(false);
        }
    }

    const register = async(email: string, _password: string) => {
       setError(null);
       setIsLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve,800));
            const testToken = `test-token-register-${email}`;
            persistAuth({email}, testToken);
       } catch (err) {
            const message = err instanceof Error ? err.message: "Đăng ký thất bại";
            setError(message);
            throw err;
       }
        finally
        {
            setIsLoading(false);
        }
    }

    const logout = () => {
        persistAuth(null, null);
        setError(null);
    }

    const clearError = () => setError(null)

    //Sử dụng useMemo tránh tính lại không cần thiết
    const value = useMemo(
        () => ({
            user,
            isAuthenticated,
            token,
            isLoading,
            error,
            login,
            register,
            logout,
            clearError,
        }),
        [user, token, isLoading, error, isAuthenticated]
    )
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
 
export const useAuth = () => {
    const context = useContext(AuthContext);

    if(!context)
    {
        throw new Error("useAuth phải được dùng trong AuthProvider");
    }
    return context;
}

export default AuthContext