export default function myExample () {
    return {
      name: 'my-example', // this name will show up in warnings and errors
      resolveId ( source ) {
          if (source === 'data:text/javascript, base64 xasdf ') {
            console.log('[resolveId]', source)
          return source; // this signals that rollup should not ask other plugins or check the file system to find this id
        }
        return null; // other ids should be handled as usually
      },
      load ( id ) {
        if (id === 'data:text/javascript, base64 xasdf ') {
            console.log('[load]', id)
          return 'export default "This is virtual!"'; // the source code for "virtual-module"
        }
        return null; // other ids should be handled as usually
      }
    };
  }