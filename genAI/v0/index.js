import OpenAi from 'openai'

const openAI_KEY=""

const client = new OpenAi({apiKey: openAI_KEY})

const response = await client.responses.create({
    instructions : "",
    input :"",
    model: "gpt-4o-mini"
})

console.log(response.output_text)

const response2 = await client.responses.create({
    input :[
        {
            role : "system",
            content: "answer in bangla lang",
        },
        {
            role : "user",
            content: "what is ... ",
        }
    ],
    model: "gpt-4o-mini"
})
