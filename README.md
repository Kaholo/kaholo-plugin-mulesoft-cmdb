# kaholo-plugin-mulesoft-cmdb
MuleSoft CMDB plugin for Kaholo.

## Settings
1. Endpoint URL (string) **Required** - The base URL of the MuleSoft endpoint.
2. User Name (string) **Required**
3. Password (vault) **Required**

## Method: Get Objects
Get objects of a specific type. Gets the object based on the condition specified, and retrieves only specified fields of the objects. 

### Parameters:
1. Object Type (options) **Required** - The type of object to get back information on.
2. Condition (string) **Required** - Condition to query the objects by.
3. Fields Keys (text) **Required** - The keys(names) of the fields to retrieve. Separate each field key with a new line.
4. useDisplayValues (boolean) **Optional** - Should use display values in ID fields. Default value is false.

## Method: Create Object
Create an object of a specific type with the provided fields.

### Parameters:
1. Object Type (options) **Required** - The type of object to create.
2. Fields (text) **Required** - The object fields and their values, in the format of **Field=Value**. Separate each key=value pair with new line.

## Method: Change Object
Change the fields of the specified object.

### Parameters:
1. ID (string) **Required** - The ID of the object to change.
2. Fields (text) **Required** - The object new fields and their values, in the format of **Field=Value**. Separate each key=value pair with new line.
