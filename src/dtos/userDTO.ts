export interface IUserDTO {
	id: number,
	userName: string,
	isActive: boolean,
	created_at?: string,
	updated_at?: string,
}

export interface IUserInputDTO {
	userName?: string,
	password?: string,
	isActive?: boolean,
}

export interface IAuthUserInputDTO {
	userName: string,
	password: string,
}

export interface IAuthUserDTO extends IAuthUserInputDTO{
	id: number
}