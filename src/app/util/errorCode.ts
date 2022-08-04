export enum errCode{
    BAD_REQUEST=400
  }
 export const ErrorCodes: { [key: string]: CustomError } = {
    UNAUTHORIZED: {
        CODE: "UNAUTHORIZED",
        MESSAGE: "User is not allowed to perform this operation",
    },
    USER_NOT_FOUND: {
        CODE: "USER_NOT_FOUND",
        MESSAGE: "User not found",
    },
    USER_WITH_ID_NOT_FOUND: {
        CODE: "USER_WITH_ID_NOT_FOUND",
        MESSAGE: "User with given id not found",
    },
    VALIDATION_ERROR: {
        CODE: "VALIDATION_ERROR",
        MESSAGE: "Validation failed error",
    },
    EMPLOYEE_NOT_FOUND: {
        CODE: "EMPLOYEE_NOT_FOUND",
        MESSAGE: "Employee not found"
    },
    INCORRECT_USERNAME_OR_PASSWORD: {
        CODE: "INCORRECT_USERNAME_OR_PASSWORD",
        MESSAGE: "Incorrect username or password"
    }
};

export interface CustomError {
    CODE: string;
    MESSAGE: string;
}