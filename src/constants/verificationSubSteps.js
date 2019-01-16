import * as STEPS from './verificationSteps';
import i18n from '../data/i18n';

const getTransactionId = 'getTransactionId';
const computeLocalHash = 'computeLocalHash';
const fetchRemoteHash = 'fetchRemoteHash';
const getIssuerProfile = 'getIssuerProfile';
const parseIssuerKeys = 'parseIssuerKeys';
const compareHashes = 'compareHashes';
const checkMerkleRoot = 'checkMerkleRoot';
const checkReceipt = 'checkReceipt';
const checkIssuerSignature = 'checkIssuerSignature';
const checkAuthenticity = 'checkAuthenticity';
const checkRevokedStatus = 'checkRevokedStatus';
const checkExpiresDate = 'checkExpiresDate';

function getTextFor (subStep, status) {
  return i18n['en-US'].subSteps[`${subStep}${status}`];
}

const LABEL = 'Label';
const LABEL_PENDING = 'LabelPending';

const subStepsMap = {
  [STEPS.formatValidation]: [getTransactionId, computeLocalHash, fetchRemoteHash, getIssuerProfile, parseIssuerKeys],
  [STEPS.hashComparison]: [compareHashes, checkMerkleRoot, checkReceipt],
  [STEPS.statusCheck]: [checkIssuerSignature, checkAuthenticity, checkRevokedStatus, checkExpiresDate]
};

const generateSubsteps = (substeps, parentKey) => {
  return substeps.reduce((acc, curr) => {
    acc[curr] = {
      code: curr,
      label: getTextFor(curr, LABEL),
      labelPending: getTextFor(curr, LABEL_PENDING),
      parentStep: parentKey
    };
    return acc;
  }, {});
}

const language = {
  ...generateSubsteps(subStepsMap[STEPS.formatValidation], STEPS.formatValidation),
  ...generateSubsteps(subStepsMap[STEPS.hashComparison], STEPS.hashComparison),
  ...generateSubsteps(subStepsMap[STEPS.statusCheck], STEPS.statusCheck)
};

export {
  getTransactionId,
  computeLocalHash,
  fetchRemoteHash,
  getIssuerProfile,
  parseIssuerKeys,
  compareHashes,
  checkMerkleRoot,
  checkReceipt,
  checkIssuerSignature,
  checkAuthenticity,
  checkRevokedStatus,
  checkExpiresDate,
  language
};
