import { useQuery } from "@tanstack/react-query";
export const useReviews = () =>{
    return useQuery({
         queryKey: ["reviews"], // name of data (unique identity of data)
        queryFn: async()=>{
            const res = await fetch('https://chill-gamer-server-eight-lac.vercel.app//game'); 
         
             return res.json(); //brings data
        }
    });
};