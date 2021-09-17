export interface IUserDTO {
	id: number,
	name: string,
	isActive: boolean,
	created_at?: string,
	updated_at?: string,
}

export interface IUserInputDTO {
	name?: string,
	password?: string,
	isActive?: boolean,
}

export interface IAuthUserInputDTO {
	name: string,
	password: string,
}

export interface IAuthUserDTO extends IAuthUserInputDTO{
	id: number
}