import http from "../http-common";
import { IUser } from "../types/auth.type";

class AuthDataService {
    getUser() {
        return http.get<IUser>('/auth/user', {
            withCredentials: true
        });
    }

    register(data: {name: string, email: string, password: string}) {
        return http.post('/auth/register', data)
    }

    login(data: {email: string, password: string}) {
        return http.post('/auth/login', (data))
    }

    logout() {
        return http.post('/logout', undefined, {
            withCredentials: true
        })
    }
}

export default new AuthDataService();