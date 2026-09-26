export async function onRequestPost(context) {
    const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json"
    };

    try {
        const { request, env } = context;
        const body = await request.json();
        const packageId = body.packageId;

        if (!packageId) {
            return new Response(JSON.stringify({ error: "Missing packageId" }), {
                status: 400,
                headers: corsHeaders
            });
        }

        const projectId = env.TEBEX_PROJECT_ID ? env.TEBEX_PROJECT_ID.trim() : "1574102";
        const privateKey = env.TEBEX_PRIVATE_KEY ? env.TEBEX_PRIVATE_KEY.trim() : "";

        // 1. Initialize Tebex Basket
        const basketRes = await fetch("https://checkout.tebex.io/api/baskets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Basic ${btoa(projectId + ":" + privateKey)}`
            },
            body: JSON.stringify({
                return_url: "https://lv-studios-store.pages.dev/?status=success",
                complete_url: "https://lv-studios-store.pages.dev/?status=success",
                cancel_url: "https://lv-studios-store.pages.dev/?status=cancel"
            })
        });

        const basketData = await basketRes.json();
        const basketIdent = basketData?.data?.ident;

        if (!basketIdent) {
            // Error details return karega taaki exact problem pata chale
            return new Response(JSON.stringify({ 
                error: "Tebex basket initialization failed", 
                details: basketData 
            }), {
                status: 500,
                headers: corsHeaders
            });
        }

        // 2. Add Package to Basket
        const addRes = await fetch(`https://checkout.tebex.io/api/baskets/${basketIdent}/packages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Basic ${btoa(projectId + ":" + privateKey)}`
            },
            body: JSON.stringify({
                package_id: Number(packageId)
            })
        });

        const addData = await addRes.json();
        const checkoutUrl = addData?.data?.links?.checkout || basketData?.data?.links?.checkout;

        return new Response(JSON.stringify({ checkoutUrl }), {
            status: 200,
            headers: corsHeaders
        });

    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: corsHeaders
        });
    }
}

export async function onRequestOptions() {
    return new Response(null, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
        }
    });
}
