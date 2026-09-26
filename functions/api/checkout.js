export async function onRequestPost(context) {
    try {
        const { request, env } = context;
        const body = await request.json();
        const packageId = body.packageId;

        if (!packageId) {
            return new Response(JSON.stringify({ error: "Missing packageId" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        // 1. Create Basket with Tebex Headless Checkout API
        const basketRes = await fetch("https://checkout.tebex.io/api/baskets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${btoa(env.TEBEX_PROJECT_ID + ":" + env.TEBEX_PRIVATE_KEY)}`
            },
            body: JSON.stringify({
                complete_url: "https://lv-studios-store.pages.dev/?status=success",
                cancel_url: "https://lv-studios-store.pages.dev/?status=cancel"
            })
        });

        const basketData = await basketRes.json();
        const basketIdent = basketData?.data?.ident;

        if (!basketIdent) {
            return new Response(JSON.stringify({ error: "Failed to initialize basket", details: basketData }), {
                status: 500,
                headers: { "Content-Type": "application/json" }
            });
        }

        // 2. Add Package to Basket
        const addRes = await fetch(`https://checkout.tebex.io/api/baskets/${basketIdent}/packages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${btoa(env.TEBEX_PROJECT_ID + ":" + env.TEBEX_PRIVATE_KEY)}`
            },
            body: JSON.stringify({ package_id: packageId })
        });

        const addData = await addRes.json();
        const checkoutUrl = addData?.data?.links?.checkout || basketData?.data?.links?.checkout;

        return new Response(JSON.stringify({ checkoutUrl }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
