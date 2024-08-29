import Prompt from "@models/prompt"
import { connectToDB } from "@utils/database"

export const GET = async (req, res) => {
    try {
        await connectToDB()
        const url = new URL(req.url, `http://${req.headers.host}`);
        const tag = url.searchParams.get('tag');
        const query = {};
        if(tag) query.tag = tag
        const prompts = await Prompt.find(query).populate('creator');
            return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", {status: 500})
    }
}