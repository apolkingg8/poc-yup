import * as y from "yup"

test('nested', ()=> {
    const schema = y.object({
        prop1: y.string(),
        prop2: y.number().required(),
        prop3: y.object({
            prop1: y.string(),
            prop2: y.number().required(),
        }),
    })

    //type s = InferType<typeof schema>
    //let temp: s = {}

    expect(()=> {schema.validateSync({
        prop1: '123',
        prop2: 123,
        prop3: {
            prop1: '123',
            prop2: 123,
        }
    })}).not.toThrow()
    expect(()=> {schema.validateSync({
        prop1: '123',
        prop2: 123,
        prop3: {
            prop1: '123',
        }
    })}).toThrow()
    expect(()=> {schema.validateSync({
        prop1: '123',
        prop3: {
            prop1: '123',
            prop2: 123,
        }
    })}).toThrow()
    expect(()=> {schema.validateSync({
        prop1: '123',
        prop2: '123',
        prop3: {
            prop1: '123',
            prop2: 123,
        }
    })}).not.toThrow()
    expect(()=> {schema.validateSync({
        prop1: '123',
        prop2: 123,
        prop3: {
            prop1: '123',
            prop2: '123',
        }
    })}).not.toThrow()
    expect(()=> {schema.strict().validateSync({
        prop1: '123',
        prop2: '123',
        prop3: {
            prop1: '123',
            prop2: 123,
        }
    })}).toThrow()
    expect(()=> {schema.strict().validateSync({
        prop1: '123',
        prop2: 123,
        prop3: {
            prop1: '123',
            prop2: '123',
        }
    })}).toThrow()
    expect(()=> {schema.validateSync({
        prop1: '123',
        prop2: 123,
        prop3: {
            prop2: 123,
        }
    })}).not.toThrow()
    expect(()=> {schema.validateSync({
        prop2: 123,
        prop3: {
            prop1: '123',
            prop2: 123,
        }
    })}).not.toThrow()
    expect(()=> {schema.validateSync({
        prop1: '123',
        prop2: 123,
        iShouldNotHere: 'no',
        prop3: {
            prop1: '123',
            prop2: 123,
        }
    })}).not.toThrow()
    expect(()=> {schema.validateSync({
        prop1: '123',
        prop2: 123,
        prop3: {
            prop1: '123',
            prop2: 123,
            iShouldNotHere: 'no',
        }
    })}).not.toThrow()
    expect(schema.validateSync({
        prop1: '123',
        prop2: 123,
        prop3: {
            prop1: '123',
            prop2: 123,
            iShouldNotHere: 'no',
        }
    })).toEqual({
        prop1: '123',
        prop2: 123,
        prop3: {
            prop1: '123',
            prop2: 123,
            iShouldNotHere: 'no',
        }
    })
    expect(schema.validateSync({
        prop1: '123',
        prop2: 123,
        iShouldNotHere: 'no',
        prop3: {
            prop1: '123',
            prop2: 123,
        }
    })).toEqual({
        prop1: '123',
        prop2: 123,
        iShouldNotHere: 'no',
        prop3: {
            prop1: '123',
            prop2: 123,
        }
    })
})

export {}
