# Json-to-go-cli.js

https://mholt.github.io/json-to-go/

Command line wrapper around the [JSON-to-Go](https://github.com/mholt/json-to-go) module which powers the https://mholt.github.io/json-to-go/ online utility for converting a json object into a Golang type definition.

## Usage
```
Usage: json-to-go [Options] [-s/--string] <json-string> [-f/--file] <json-filepath>

Options:
  -V, --version          output the version number
  -f, --file <path>      location of file containing json to convert
  -s, --string <string>  json string to convert
  -i, --inline           Use inline type definitions
  -h, --help             output usage information
```

## Examples

### Providing a string
```
user@host # json-to-go -s '{"status": {"message": "All Good!"}}'
type AutoGenerated struct {
	Status struct {
		Message string `json:"message"`
	} `json:"status"`
}
```
### Providing a file path
```
user@host # json-to-go -f /path/to/json-file.json '{"status": {"message": "All Good!"}}'
type AutoGenerated struct {
	Status struct {
		Message string `json:"message"`
	} `json:"status"`
}
```

### Inline Type Definitions
```
user@host # json-to-go -f /path/to/json-file.json '{"status": {"message": "All Good!"}}'
type AutoGenerated struct {
	Status Status `json:"status"`
}
type Status struct {
	Message string `json:"message"`
}
```

## Credits

Original JSON-to-Go utility/library created by Matt Holt ([mholt6](https://twitter.com/mholt6)) which can be found [here](https://github.com/mholt/json-to-go).

Command line utility created by Ricky Grassmuck.
