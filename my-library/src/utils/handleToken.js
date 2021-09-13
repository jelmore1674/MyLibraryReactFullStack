export const handleToken = async(token) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_HOST}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });
        const data = await res.json();
        console.log(data);
        if (data.message === 'Unathorized') {
            return null;
        } else if (data.id) {
            const resp = await fetch(
                `${process.env.REACT_APP_HOST}/user/${data.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token,
                    },
                }
            );
            const user = await resp.json();
            return user;
        }
    } catch (err) {
        console.log(err);
    }
};