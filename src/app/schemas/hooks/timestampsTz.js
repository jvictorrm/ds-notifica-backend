import momentTz from 'moment-timezone';

export default async function(
  schema,
  options = {
    timezone: 'America/Sao_Paulo',
    createdAtName: 'createdAt',
    updatedAtName: 'updatedAt',
  }
) {
  function now() {
    momentTz.tz.setDefault(options.timezone);
    const tzOffsetUTC = momentTz().format('ZZ');
    return momentTz().utcOffset(tzOffsetUTC)._d;
  }

  schema.pre('save', async function(next) {
    this[options.createdAtName] = now();
    this[options.updatedAtName] = now();
    next();
  });

  schema.pre(
    ['updateOne', 'findOneAndUpdate', 'findByIdAndUpdate'],
    async function(next) {
      this._update.$set[options.updatedAtName] = now();
      next();
    }
  );
}
