// The export below all the imports is...
/*
	export const all_checks: Check[] = [
		oat0001,
		oat0002,
		...
	];
*/
// Putting the checks into the DB is done by /db/db.ts
//
// Now back to importing all of the checks in /src/data/checks
import { Check } from "../interfaces";
import { oat0001 } from "./checks/oat0001";
import { oat0002 } from "./checks/oat0002";
import { oat0003 } from "./checks/oat0003";
import { oat0004 } from "./checks/oat0004";
import { oat0005 } from "./checks/oat0005";
import { oat0006 } from "./checks/oat0006";
import { oat0007 } from "./checks/oat0007";
import { oat0008 } from "./checks/oat0008";
import { oat0009 } from "./checks/oat0009";
import { oat0010 } from "./checks/oat0010";
import { oat0011 } from "./checks/oat0011";
import { oat0012 } from "./checks/oat0012";
import { oat0013 } from "./checks/oat0013";
import { oat0014 } from "./checks/oat0014";
import { oat0015 } from "./checks/oat0015";
import { oat0016 } from "./checks/oat0016";
import { oat0017 } from "./checks/oat0017";
import { oat0018 } from "./checks/oat0018";
import { oat0019 } from "./checks/oat0019";
import { oat0020 } from "./checks/oat0020";
import { oat0021 } from "./checks/oat0021";
import { oat0022 } from "./checks/oat0022";
import { oat0023 } from "./checks/oat0023";
import { oat0024 } from "./checks/oat0024";
import { oat0025 } from "./checks/oat0025";
import { oat0026 } from "./checks/oat0026";
import { oat0027 } from "./checks/oat0027";
import { oat0028 } from "./checks/oat0028";
import { oat0029 } from "./checks/oat0029";
import { oat0030 } from "./checks/oat0030";
import { oat0031 } from "./checks/oat0031";
import { oat0032 } from "./checks/oat0032";
import { oat0033 } from "./checks/oat0033";
import { oat0034 } from "./checks/oat0034";
import { oat0035 } from "./checks/oat0035";
import { oat0036 } from "./checks/oat0036";
import { oat0037 } from "./checks/oat0037";
import { oat0038 } from "./checks/oat0038";
import { oat0039 } from "./checks/oat0039";
import { oat0040 } from "./checks/oat0040";
import { oat0041 } from "./checks/oat0041";
import { oat0042 } from "./checks/oat0042";
import { oat0043 } from "./checks/oat0043";
import { oat0044 } from "./checks/oat0044";
import { oat0045 } from "./checks/oat0045";
import { oat0046 } from "./checks/oat0046";
import { oat0047 } from "./checks/oat0047";
import { oat0048 } from "./checks/oat0048";
import { oat0049 } from "./checks/oat0049";
import { oat0050 } from "./checks/oat0050";
import { oat0051 } from "./checks/oat0051";
import { oat0052 } from "./checks/oat0052";
import { oat0053 } from "./checks/oat0053";
import { oat0054 } from "./checks/oat0054";
import { oat0055 } from "./checks/oat0055";
import { oat0056 } from "./checks/oat0056";
import { oat0057 } from "./checks/oat0057";
import { oat0058 } from "./checks/oat0058";
import { oat0059 } from "./checks/oat0059";
import { oat0060 } from "./checks/oat0060";
import { oat0061 } from "./checks/oat0061";
import { oat0062 } from "./checks/oat0062";
import { oat0063 } from "./checks/oat0063";
import { oat0064 } from "./checks/oat0064";
import { oat0065 } from "./checks/oat0065";
import { oat0066 } from "./checks/oat0066";
import { oat0067 } from "./checks/oat0067";
import { oat0068 } from "./checks/oat0068";
import { oat0069 } from "./checks/oat0069";
import { oat0070 } from "./checks/oat0070";
import { oat0071 } from "./checks/oat0071";
import { oat0072 } from "./checks/oat0072";
import { oat0073 } from "./checks/oat0073";
import { oat0074 } from "./checks/oat0074";
import { oat0075 } from "./checks/oat0075";
import { oat0076 } from "./checks/oat0076";
import { oat0077 } from "./checks/oat0077";
import { oat0078 } from "./checks/oat0078";
import { oat0079 } from "./checks/oat0079";
import { oat0080 } from "./checks/oat0080";
import { oat0081 } from "./checks/oat0081";
import { oat0082 } from "./checks/oat0082";
import { oat0083 } from "./checks/oat0083";
import { oat0084 } from "./checks/oat0084";
import { oat0085 } from "./checks/oat0085";
import { oat0086 } from "./checks/oat0086";
import { oat0087 } from "./checks/oat0087";
import { oat0088 } from "./checks/oat0088";
import { oat0089 } from "./checks/oat0089";
import { oat0090 } from "./checks/oat0090";
import { oat0091 } from "./checks/oat0091";
import { oat0092 } from "./checks/oat0092";
import { oat0093 } from "./checks/oat0093";
import { oat0094 } from "./checks/oat0094";
import { oat0095 } from "./checks/oat0095";
import { oat0096 } from "./checks/oat0096";
import { oat0097 } from "./checks/oat0097";
import { oat0098 } from "./checks/oat0098";
import { oat0099 } from "./checks/oat0099";
import { oat0100 } from "./checks/oat0100";
import { oat0101 } from "./checks/oat0101";
import { oat0102 } from "./checks/oat0102";
import { oat0103 } from "./checks/oat0103";
import { oat0104 } from "./checks/oat0104";
import { oat0105 } from "./checks/oat0105";
import { oat0106 } from "./checks/oat0106";
import { oat0107 } from "./checks/oat0107";

export const all_checks: Check[] = [
	oat0001,
	oat0002,
	oat0003,
	oat0004,
	oat0005,
	oat0006,
	oat0007,
	oat0008,
	oat0009,
	oat0010,
	oat0011,
	oat0012,
	oat0013,
	oat0014,
	oat0015,
	oat0016,
	oat0017,
	oat0018,
	oat0019,
	oat0020,
	oat0021,
	oat0022,
	oat0023,
	oat0024,
	oat0025,
	oat0026,
	oat0027,
	oat0028,
	oat0029,
	oat0030,
	oat0031,
	oat0032,
	oat0033,
	oat0034,
	oat0035,
	oat0036,
	oat0037,
	oat0038,
	oat0039,
	oat0040,
	oat0041,
	oat0042,
	oat0043,
	oat0044,
	oat0045,
	oat0046,
	oat0047,
	oat0048,
	oat0049,
	oat0050,
	oat0051,
	oat0052,
	oat0053,
	oat0054,
	oat0055,
	oat0056,
	oat0057,
	oat0058,
	oat0059,
	oat0060,
	oat0061,
	oat0062,
	oat0063,
	oat0064,
	oat0065,
	oat0066,
	oat0067,
	oat0068,
	oat0069,
	oat0070,
	oat0071,
	oat0072,
	oat0073,
	oat0074,
	oat0075,
	oat0076,
	oat0077,
	oat0078,
	oat0079,
	oat0080,
	oat0081,
	oat0082,
	oat0083,
	oat0084,
	oat0085,
	oat0086,
	oat0087,
	oat0088,
	oat0089,
	oat0090,
	oat0091,
	oat0092,
	oat0093,
	oat0094,
	oat0095,
	oat0096,
	oat0097,
	oat0098,
	oat0099,
	oat0100,
	oat0101,
	oat0102,
	oat0103,
	oat0104,
	oat0105,
	oat0106,
	oat0107,
];
