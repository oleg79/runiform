# Reusable Universal Form

**R**eusable **Uni**versal **Form** - **Runiform**

### How to run
```bash
yarn start
```
### How to use
Example:
```tsx
    <Runiform
      fieldSet={{
        name: {
          type: InputType.text,
          value: '',
          validators: []
        }
      }}
      onSubmit={(state) => ...}
    />
```
will create one text input field based form without any validation.

#### Props
name | required | type | description
--- | --- | --- | ---
fieldSet | ✅ | `FieldSet` | main form configuration
onSubmit | ✅ | `(input: RuniformState) => void` | on submit callback
submitText | ✅ | `string` | submit button text
styles | ❌ | `StylesObject` | styles object created via scss modules. if not provided default styled will be used


#### Types
##### FieldSet
name | required | type | description
--- | --- | --- | ---
type | ✅ | `InputType` | Specifies input type. Has to be one of `enum InputType` values e.g. `InputType.text`
value | ✅ | `string` or `boolean` | Specifies initial value of the input. Has to correlate with `type` value e.g. for `InputType.text` it has to be `string`, for `InputType.checkbox` - `boolean`
validators | ❌ | `Validators` | An array of validation function.
label | ❌ | `string` | A value for the field label. If not provided field set key will be used instead.
placeholder | ❌ | `string` | Input placeholder.


#### Validators
To validate an input value any function that satisfies `ValidatorCreator` type can be used. In order to fulfill the contract a function should be a higher order function that accepts required `message` argument and returns a function that takes a **value**, and the **previous validation result** and returns a new validation result. 

The library provides some predefined validation functions:
* `required` - checks if a value is truly
  ```ts
    const validator = required('Some error mesage');
    validator('', []); // ['Some error mesage']
    validator('value', []); // []
  ```
* `minLength` - checks if a value has a length of at least `n` characters
  ```ts
    const validator = minLength('Some error mesage', 5);
    validator('val', []); // ['Some error mesage']
    validator('value', []); // []
  ```
* `minLengthForNotRequired` - checks if a value has a length of at least `n` characters only if the value is not empty
    ```ts
    const validator = minLengthForNotRequired('Some error mesage', 5);
    validator('val', []); // ['Some error mesage']
    validator('', []); // []
    validator('value', []); // []
  ```
* `maxLength` - checks if a value has a length of `n` at most
  ```ts
    const validator = maxLength('Some error mesage', 7);
    validator('val', []); // []
    validator('value val', []); // ['Some error mesage']
  ```
* `startsWith` - checks if a value starts with a `substring`
  ```ts
    const validator = startsWith('Some error mesage', 'wooga.name');
    validator('value', []); // ['Some error mesage']
    validator('wooga.name.value', []); // []
  ```

### TODO
* [x] Text input
* [x] Checkbox input  
* [ ] Password input
* [ ] Number input
* [ ] File input
* [ ] Radio input
* [ ] Select input
