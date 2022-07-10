import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios';
import { schema } from '@ioc:Adonis/Core/Validator'
export default class LibrariesController {
    public async books({  }: HttpContextContract ) {
        try {
            // 👇️ const data: GetUsersResponse
            const { data } = await axios.get<any>(
              'http://openlibrary.org/subjects/love.json',
              {
                headers: {
                  Accept: 'application/json',
                },
              },
            );
            return data;
          } catch (error) {
            if (axios.isAxiosError(error)) {
              return error.message;
            } else {
              return 'An unexpected error occurred';
            }
          }
    }
    public async rentBooks({request,response}:HttpContextContract) {
        const newPostSchema = schema.create({
            title: schema.string(),
            author: schema.string(),
            edition: schema.number(),
            schedule: schema.string(),
          })
          const payload = await request.validate({ schema: newPostSchema })
          try {
            // 👇️ const data: GetUsersResponse
            const { data } = await axios.get<any>(
              'http://openlibrary.org/subjects/love.json',
              {
                headers: {
                  Accept: 'application/json',
                },
              },
            );
            if(data.works){
                let notFound = false
                data.works.forEach(function callback(value, index) {
                   if(value.title == request.input('title') && value.edition_count == request.input('edition')){
                    if(value.authors){
                        value.authors.forEach(function callback(valuea, indexa) {
                            if(valuea.name ==  request.input('author')){
                                response.status(200).json({message: 'Success Made Schedule'})
                            }else{
                                response.status(400).json({message: 'The Book Not Found'})
                            }
                        })
                    }else{
                        response.status(400).json({message: 'The Book Not Found'})
                    }
                  
                   }else{
                    notFound = true
                   }
                });
                if(notFound == true){
                    response.status(400).json({message: 'The Book Not Found'})
                }
                
            }
    
          } catch (error) {
            if (axios.isAxiosError(error)) {
              return error.message;
            } else {
              return 'An unexpected error occurred';
            }
          }
      }
}
