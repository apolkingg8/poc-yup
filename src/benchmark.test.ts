import * as y from "yup"

// around 140ms - classic
// around 140ms - 1.0.0
test('benchmark-1 10k success', ()=> {
    const schema = y.object({
        prop1: y.string(),
        prop2: y.number().required(),
        prop3: y.object({
            prop1: y.string(),
            prop2: y.number().required(),
        }),
    })
    const dumbs = []

    for(let i=0; i<10000; i++) {
        dumbs.push({
            prop1: `${i}`,
            prop2: i,
            prop3: {
                prop1: `${i}`,
                prop2: i,
            }
        })
    }

    const st = Date.now()

    for(let i=0; i<dumbs.length; i++) {
        schema.validateSync(dumbs[i])
    }

    const end = Date.now()
    console.log(`Cost: ${end-st} ms`)
})

// around 390ms - classic
// around 440ms - 1.0.0
test('benchmark-2 10k with 50% fail rate', ()=> {
    const schema = y.object({
        prop1: y.string(),
        prop2: y.number().required(),
        prop3: y.object({
            prop1: y.string(),
            prop2: y.number().required(),
        }),
    })
    const dumbs = []

    for(let i=0; i<10000; i++) {
        if(Math.random() > 0.5) {
            dumbs.push({
                prop1: `${i}`,
                prop2: i,
                prop3: {
                    prop1: `${i}`,
                    prop2: i,
                }
            })
        } else {
            dumbs.push({
                prop1: 123,
                prop2: `yo`,
                prop3: {
                    prop1: 123,
                    prop2: `yo`,
                }
            })
        }
    }

    const st = Date.now()

    for(let i=0; i<dumbs.length; i++) {
        try {
            schema.validateSync(dumbs[i])
        } catch (err) {

        }
    }

    const end = Date.now()
    console.log(`Cost: ${end-st} ms`)
})

export {}
