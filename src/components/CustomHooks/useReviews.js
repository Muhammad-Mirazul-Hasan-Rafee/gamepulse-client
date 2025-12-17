import { useQuery } from "@tanstack/react-query";
export const useReviews = () =>{
    return useQuery({
         queryKey: ["reviews"], // name of data (unique identity of data)
        queryFn: async()=>{
            const res = await fetch('https://chill-gamer-server1-r58yveu40-hasan-rafees-projects.vercel.app/game'); 
         
             return res.json(); //brings data
        }
    });
};