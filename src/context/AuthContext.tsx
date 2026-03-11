import { createContext, useContext, useEffect, useState } from "react"

type User = {
    email: string
}

// Tạo kiểu dữ liệu cho user và context
type AuthContextValue = {
    user: User | null
    isAuthenticated: boolean
    token: string | null
    login: (email: string, password: string) => Promise<void>
    register: (email: string, password: string) => Promise<void>
    logout: () => void
}

//Kho dữ liệu chung lưu thông tin AuthContextValue
const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const STORAGE_KEY = "jobster_auth_user";

//Bọc app và cung cấp AuthContext cho toàn bộ App
//children : các component được bọc trong AuthProvider
export const AuthProvider = ({children} : {children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null) // lưu thông tin user hiện tại
    const [token, setToken] = useState<string | null>(null);
    const isAuthenticated = !!user && !!token // kiểm tra user đã đăng nhập hay chưa

    //Load user từ localStorage khi app chạy => giữ trạng thái đăng nhập khi load trang
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if(stored)
        {
            try {
                const parsed = JSON.parse(stored);
                setUser(parsed.user);
                setToken(parsed.token);
            } 
            catch 
            {
                localStorage.removeItem(STORAGE_KEY);    
            }
        }
    },[])

    //Cập nhật React State (setUser) và localStorage khi thay đổi user
    const persistAuth = (nextUser: User | null, nextToken: string | null) => {
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

    const login = async(email: string, password: string) => {
        if(password.length < 6)
        {
            throw new Error("Mật khẩu phải có ít nhất 6 ký tự");
        }

        const testToken = `test-token-login-${email}`;
        persistAuth({email},testToken);
    }

    const register = async(email: string, password: string) => {
       if(password.length < 6)
       {
        throw new Error("Mật khẩu phải có ít nhất 6 ký tự")
       }
       const testToken = `test-token-login-${email}`;
       persistAuth({email}, testToken);

    }

    const logout = () => {
        persistAuth(null, null)
    }

    return (
        <AuthContext.Provider
          value={{
            user,
            isAuthenticated,
            token,
            login,
            register,
            logout,
          }}
        >
          {children}
        </AuthContext.Provider>
    )
}
 
export const useAuth = () => {
    const ctx = useContext(AuthContext);

    if(!ctx)
    {
        throw new Error("useAuth phải được dùng trong AuthProvider");
    }
    return ctx;
}

export default AuthContext