type Rule = {
  operator: string;
  value1: number;
  value2?: number;
  color: string;
};

export function getColorFromRules(temp: number, rules: Rule[]): string {
  for (const rule of rules) {
    switch (rule.operator) {
      case '<':
        if (temp < rule.value1) return rule.color;
        break;
      case '>':
        if (temp > rule.value1) return rule.color;
        break;
      case '<=':
        if (temp <= rule.value1) return rule.color;
        break;
      case '>=':
        if (temp >= rule.value1) return rule.color;
        break;
      case 'between':
        if (rule.value2 && temp >= rule.value1 && temp <= rule.value2) return rule.color;
        break;
    }
  }
  return 'gray'; // default color
}
