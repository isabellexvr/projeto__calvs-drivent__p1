import { request } from "@/utils/request";
import { notFoundError } from "@/errors";
import addressRepository, { CreateAddressParams } from "@/repositories/address-repository";
import enrollmentRepository, { CreateEnrollmentParams } from "@/repositories/enrollment-repository";
import { exclude } from "@/utils/prisma-utils";
import { Enrollment } from "@prisma/client";
import { AxiosResponse } from "axios";
import { ViaCEPAddress, AddressObjEntity, Address } from "@/protocols";

async function getAddressFromCEP(cep: string): Promise<ViaCEPAddress> {
  const result = await request.get(`https://viacep.com.br/ws/${cep}/json/`) as AxiosResponse<AddressObjEntity>;

  if (!result.data) {
    throw notFoundError();
  }

  const final = result.data;

  return {
    logradouro: final.logradouro,
    complemento: final.complemento,
    bairro: final.bairro,
    cidade: final.localidade,
    uf: final.uf
  };
}

async function getOneWithAddressByUserId(userId: number): Promise<GetOneWithAddressByUserIdResult> {
  const enrollmentWithAddress = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollmentWithAddress) throw notFoundError();

  const [firstAddress] = enrollmentWithAddress.Address;
  const address = getFirstAddress(firstAddress);

  return {
    ...exclude(enrollmentWithAddress, "userId", "createdAt", "updatedAt", "Address"),
    ...(!!address && { address }),
  };
}

type GetOneWithAddressByUserIdResult = Omit<Enrollment, "userId" | "createdAt" | "updatedAt">;

function getFirstAddress(firstAddress: Address): GetAddressResult {
  if (!firstAddress) return null;

  return exclude(firstAddress, "createdAt", "updatedAt", "enrollmentId");
}

type GetAddressResult = Omit<Address, "createdAt" | "updatedAt" | "enrollmentId">;

async function createOrUpdateEnrollmentWithAddress(params: CreateOrUpdateEnrollmentWithAddress) {
  const finalEnrollment = {
    name: params.name,
    cpf: params.cpf,
    birthday: new Date(params.birthday),
    phone: params.phone,
    userId: params.userId
  };
  const address = getAddressForUpsert(params.address);

  const result = await request.get(`https://viacep.com.br/ws/${address.cep}/json/`) as AxiosResponse<AddressObjEntity>;

  if (result.data.erro) {
    throw notFoundError();
  }
  const newEnrollment = await enrollmentRepository.upsert(params.userId, finalEnrollment, exclude(finalEnrollment, "userId"));

  await addressRepository.upsert(newEnrollment.id, address, address);
}

function getAddressForUpsert(address: CreateAddressParams) {
  return {
    ...address,
    ...(address?.addressDetail && { addressDetail: address.addressDetail }),
  };
}

export type CreateOrUpdateEnrollmentWithAddress = CreateEnrollmentParams & {
  address: CreateAddressParams;
};

const enrollmentsService = {
  getOneWithAddressByUserId,
  createOrUpdateEnrollmentWithAddress,
  getAddressFromCEP
};

export default enrollmentsService;
