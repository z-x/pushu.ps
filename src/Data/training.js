/*
	The training data in a format like follows:
	trainingLevel: { pushupsNumber: {rest: (seconds), pushups: [array]} }
*/



const training = {
	1: {
		1: {
			rest: 60,
			pushups: [1, 2, 3, 3, 2]
		},
		2: {
			rest: 60,
			pushups: [2, 3, 3, 4, 3]
		},
		3: {
			rest: 60,
			pushups: [3, 4, 5, 5, 4]
		},
		4: {
			rest: 60,
			pushups: [3, 5, 5, 5, 5]
		},
		5: {
			rest: 90,
			pushups: [4, 5, 5, 5, 6]
		},
		6: {
			rest: 120,
			pushups: [4, 6, 6, 6, 7]
		},
		7: {
			rest: 60,
			pushups: [9, 10, 8, 8, 8]
		},
		8: {
			rest: 90,
			pushups: [9, 10, 9, 9, 10]
		},
		9: {
			rest: 120,
			pushups: [9, 11, 10, 10, 11]
		},
		10: {
			rest: 60,
			pushups: [10, 12, 11, 9, 11]
		},
		11: {
			rest: 90,
			pushups: [12, 14, 12, 12, 13]
		},
		12: {
			rest: 120,
			pushups: [14, 16, 13, 13, 15]
		},
		13: {
			rest: 60,
			pushups: [15, 17, 15, 15, 15]
		},
		14: {
			rest: 45,
			pushups: [9, 9, 11, 11, 9, 9, 8, 19]
		},
		15: {
			rest: 45,
			pushups: [11, 11, 13, 13, 12, 12, 9, 24]
		},
		16: {
			rest: 60,
			pushups: [22, 27, 20, 15, 34]
		},
		17: {
			rest: 120,
			pushups: [12, 12, 13, 13, 14, 14, 9, 9, 38]
		},
		18: {
			rest: 90,
			pushups: [11, 11, 15, 15, 16, 16, 14, 14, 44]
		}
	},
	2: {
		1: {
			rest: 60,
			pushups: [5, 5, 5, 5, 4]
		},
		2: {
			rest: 60,
			pushups: [5, 7, 7, 7, 6]
		},
		3: {
			rest: 60,
			pushups: [7, 9, 8, 8, 9]
		},
		4: {
			rest: 60,
			pushups: [8, 9, 9, 9, 9]
		},
		5: {
			rest: 90,
			pushups: [9, 10, 10, 10, 11]
		},
		6: {
			rest: 120,
			pushups: [10, 11, 11, 11, 13]
		},
		7: {
			rest: 60,
			pushups: [10, 15, 15, 15, 15]
		},
		8: {
			rest: 90,
			pushups: [12, 17, 16, 16, 17]
		},
		9: {
			rest: 120,
			pushups: [14, 18, 17, 17, 18]
		},
		10: {
			rest: 60,
			pushups: [16, 19, 14, 14, 17]
		},
		11: {
			rest: 90,
			pushups: [18, 22, 18, 18, 20]
		},
		12: {
			rest: 120,
			pushups: [20, 25, 22, 22, 25]
		},
		13: {
			rest: 60,
			pushups: [25, 32, 24, 21, 27]
		},
		14: {
			rest: 45,
			pushups: [16, 16, 18, 18, 12, 12, 14, 32]
		},
		15: {
			rest: 45,
			pushups: [16, 16, 18, 18, 15, 15, 18, 37]
		},
		16: {
			rest: 60,
			pushups: [37, 47, 24, 24, 42]
		},
		17: {
			rest: 120,
			pushups: [18, 18, 20, 20, 18, 18, 16, 16, 45]
		},
		18: {
			rest: 90,
			pushups: [19, 19, 27, 27, 24, 24, 16, 16, 47]
		}
	},
	3: {
		1: {
			rest: 60,
			pushups: [9, 10, 8, 8, 8]
		},
		2: {
			rest: 60,
			pushups: [9, 10, 9, 9, 10]
		},
		3: {
			rest: 60,
			pushups: [9, 13, 10, 10, 11]
		},
		4: {
			rest: 60,
			pushups: [12, 12, 11, 11, 13]
		},
		5: {
			rest: 90,
			pushups: [12, 14, 14, 14, 15]
		},
		6: {
			rest: 120,
			pushups: [14, 15, 16, 16, 18]
		},
		7: {
			rest: 60,
			pushups: [12, 16, 16, 16, 18]
		},
		8: {
			rest: 90,
			pushups: [18, 22, 17, 17, 22]
		},
		9: {
			rest: 120,
			pushups: [19, 27, 22, 22, 25]
		},
		10: {
			rest: 60,
			pushups: [18, 22, 19, 19, 22]
		},
		11: {
			rest: 90,
			pushups: [22, 26, 23, 23, 26]
		},
		12: {
			rest: 120,
			pushups: [26, 30, 27, 27, 30]
		},
		13: {
			rest: 60,
			pushups: [33, 37, 28, 22, 30]
		},
		14: {
			rest: 45,
			pushups: [17, 17, 19, 19, 15, 15, 20, 35]
		},
		15: {
			rest: 45,
			pushups: [18, 18, 21, 21, 17, 17, 20, 40]
		},
		16: {
			rest: 60,
			pushups: [42, 52, 33, 28, 45]
		},
		17: {
			rest: 120,
			pushups: [19, 19, 27, 27, 22, 22, 15, 15, 48]
		},
		18: {
			rest: 90,
			pushups: [23, 23, 30, 30, 24, 24, 20, 20, 50]
		}
	}
};


// training data for test and developement
const dev = {
	1: {
		1: {
			rest: 2,
			pushups: [1, 1]
		},
		2: {
			rest: 2,
			pushups: [101, 101]
		}
	},
	2: {
		1: {
			rest: 2,
			pushups: [2, 2]
		},
		2: {
			rest: 2,
			pushups: [22, 22]
		}
	},
	3: {
		1: {
			rest: 2,
			pushups: [3, 3]
		},
		2: {
			rest: 2,
			pushups: [33, 33]
		}
	}
};


// exports
// ------------------------------------------------------------------------
const final = (process.env.NODE_ENV === 'development') ? dev : training;

export default final;
